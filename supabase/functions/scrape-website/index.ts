import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');

async function retryWithExponentialBackoff(fn: () => Promise<any>, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  throw lastError;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting website scraping request');

    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY is not configured');
    }

    // Parse the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      throw new Error('Invalid JSON in request body');
    }

    const url = requestBody?.url;
    if (!url) {
      throw new Error('URL is required');
    }

    console.log('Scraping URL:', url);

    const response = await retryWithExponentialBackoff(async () => {
      const firecrawlResponse = await fetch('https://api.firecrawl.com/v1/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        },
        body: JSON.stringify({
          url: url,
          scrapeOptions: {
            formats: ['markdown', 'html'],
            waitForNetworkRequests: true,
            waitTime: 5000,
            maxRetries: 3,
            timeout: 30000
          }
        })
      });

      if (!firecrawlResponse.ok) {
        const errorText = await firecrawlResponse.text();
        throw new Error(`Firecrawl API error: ${firecrawlResponse.status} - ${errorText}`);
      }

      return await firecrawlResponse.json();
    });

    console.log('Successfully scraped website');

    return new Response(
      JSON.stringify(response),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in scrape-website function:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});