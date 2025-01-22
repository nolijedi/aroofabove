import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const REQUEST_TIMEOUT = 10000; // 10 seconds
const FUNCTION_TIMEOUT = 25000; // 25 seconds

async function retryWithExponentialBackoff(fn: () => Promise<Response>, retries = MAX_RETRIES, delay = INITIAL_RETRY_DELAY): Promise<Response> {
  try {
    console.log(`Making request attempt ${MAX_RETRIES - retries + 1}/${MAX_RETRIES}`);
    const timeoutPromise = new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), REQUEST_TIMEOUT);
    });
    const response = await Promise.race([fn(), timeoutPromise]);
    console.log(`Request attempt ${MAX_RETRIES - retries + 1} succeeded`);
    return response;
  } catch (error) {
    if (retries === 0) {
      console.error('All retry attempts failed:', error);
      throw error;
    }
    console.error(`Attempt ${MAX_RETRIES - retries + 1}/${MAX_RETRIES} failed:`, error);
    console.log(`Waiting ${delay}ms before next attempt...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithExponentialBackoff(fn, retries - 1, delay * 2);
  }
}

serve(async (req) => {
  const startTime = Date.now();
  console.log('Starting scrape-website function execution');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      console.error('Firecrawl API key not configured');
      throw new Error('Firecrawl API key not configured');
    }

    console.log('API key validation successful');

    const requestBody = {
      url: 'https://site.aroofabove.co',
      limit: 50,
      scrapeOptions: {
        formats: ['markdown', 'html'],
        waitForNetworkRequests: true,
        waitTime: 3000
      }
    };

    console.log('Making request to Firecrawl API with configuration:', {
      url: requestBody.url,
      limit: requestBody.limit,
      options: requestBody.scrapeOptions
    });

    const makeRequest = () => fetch('https://api.firecrawl.com/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Supabase Edge Function'
      },
      body: JSON.stringify(requestBody)
    });

    // Set up timeout for the entire function
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Function timeout exceeded')), FUNCTION_TIMEOUT);
    });

    // Execute request with retry mechanism and timeout
    const response = await Promise.race([
      retryWithExponentialBackoff(makeRequest),
      timeoutPromise
    ]);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firecrawl API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        executionTime: `${Date.now() - startTime}ms`
      });
      throw new Error(`Firecrawl API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Scrape completed successfully', {
      executionTime: `${Date.now() - startTime}ms`,
      dataSize: JSON.stringify(data).length
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in scrape-website function:', {
      message: error.message,
      stack: error.stack,
      executionTime: `${Date.now() - startTime}ms`
    });

    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
        details: error.stack,
        executionTime: `${Date.now() - startTime}ms`
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});