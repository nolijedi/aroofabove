import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      console.error('Firecrawl API key not configured');
      throw new Error('Firecrawl API key not configured');
    }

    console.log('Starting website scrape with Firecrawl API...');
    
    const requestBody = {
      url: 'https://site.aroofabove.co',
      limit: 50,
      scrapeOptions: {
        formats: ['markdown', 'html'],
        waitForNetworkRequests: true,
        waitTime: 5000
      }
    };

    console.log('Making request to Firecrawl API with body:', JSON.stringify(requestBody));

    const response = await fetch('https://api.firecrawl.com/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Received response from Firecrawl API:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firecrawl API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Firecrawl API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Website scrape completed successfully:', {
      status: response.status,
      dataLength: JSON.stringify(data).length
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in scrape-website function:', {
      error: error.message,
      stack: error.stack,
      name: error.name
    });

    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: error.stack,
        name: error.name
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});