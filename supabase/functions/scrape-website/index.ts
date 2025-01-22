import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;
const REQUEST_TIMEOUT = 10000;

async function retryWithExponentialBackoff(fn: () => Promise<Response>, retries = MAX_RETRIES, delay = INITIAL_RETRY_DELAY): Promise<Response> {
  try {
    console.log(`Making request attempt ${MAX_RETRIES - retries + 1}/${MAX_RETRIES}`);
    const timeoutPromise = new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), REQUEST_TIMEOUT);
    });
    
    const response = await Promise.race([fn(), timeoutPromise]);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    
    console.log(`Request attempt ${MAX_RETRIES - retries + 1} succeeded`);
    return response;
  } catch (error) {
    console.error(`Attempt ${MAX_RETRIES - retries + 1}/${MAX_RETRIES} failed:`, error);
    
    if (retries === 0) {
      console.error('All retry attempts failed:', error);
      throw error;
    }
    
    console.log(`Waiting ${delay}ms before next attempt...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithExponentialBackoff(fn, retries - 1, delay * 2);
  }
}

serve(async (req) => {
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

    console.log('Starting scrape request with configuration');

    const makeRequest = () => fetch('https://api.firecrawl.com/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Supabase Edge Function'
      },
      body: JSON.stringify({
        url: 'https://site.aroofabove.co',
        limit: 50,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          waitForNetworkRequests: true,
          waitTime: 3000
        }
      })
    });

    const response = await retryWithExponentialBackoff(makeRequest);
    const data = await response.json();

    console.log('Scrape completed successfully', {
      dataSize: JSON.stringify(data).length
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in scrape-website function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
        details: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});