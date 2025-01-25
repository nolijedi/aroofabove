import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SYSTEM_PROMPT } from "./prompts.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

console.log('Starting chat function with Gemini API key:', GEMINI_API_KEY ? 'present' : 'missing');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  console.log('Function started');
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log request details for debugging
    const headers = Object.fromEntries(req.headers.entries());
    console.log('Request headers:', JSON.stringify(headers, null, 2));
    
    // Check for GEMINI_API_KEY
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Gemini API key not configured',
          details: 'Please set the GEMINI_API_KEY environment variable'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    let body;
    const clonedReq = req.clone();
    const bodyText = await clonedReq.text();
    console.log('Raw request body:', bodyText);
    
    try {
      body = JSON.parse(bodyText);
      console.log('Parsed request body:', JSON.stringify(body, null, 2));
    } catch (error) {
      console.error('Error parsing request body:', error);
      console.error('Invalid JSON body:', bodyText);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body',
          details: error.message,
          receivedBody: bodyText
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate messages array
    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', JSON.stringify(body, null, 2));
      return new Response(
        JSON.stringify({ 
          error: 'Messages array is required',
          receivedBody: body
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Preparing Gemini API request with messages:', JSON.stringify(messages, null, 2));

    // Make Gemini API request
    const geminiRequestBody = {
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        ...messages.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 800,
        topP: 0.9,
        topK: 40
      },
    };
    
    console.log('Sending request to Gemini API:', JSON.stringify(geminiRequestBody, null, 2));

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiRequestBody),
    });

    // Handle Gemini API response
    const responseText = await response.text();
    console.log('Raw Gemini API response:', responseText);
    
    if (!response.ok) {
      console.error('Gemini API error response:', responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Gemini API error',
          details: responseText,
          status: response.status 
        }),
        { 
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = JSON.parse(responseText);
    console.log('Parsed Gemini response:', JSON.stringify(data, null, 2));

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from Gemini:', JSON.stringify(data, null, 2));
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response format from Gemini API',
          details: data
        }),
        { 
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const result = { text: data.candidates[0].content.parts[0].text };
    console.log('Sending successful response:', JSON.stringify(result, null, 2));

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (error) {
    console.error('Unhandled error in chat function:', error);
    console.error('Error stack:', error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred",
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});