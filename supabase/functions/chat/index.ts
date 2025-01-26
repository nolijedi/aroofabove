import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
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

// Initialize Supabase client with service role key
const supabase = createClient(
  'https://xwqwukqukudpzgdkyasu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cXd1a3F1a3VkcHpnZGt5YXN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjIzMjQwMCwiZXhwIjoyMDIxODA4NDAwfQ.7a33468e77122b44e0a3034e14f95843a1283d7c5b6e0dcd6eb4bef0882822b0',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

serve(async (req) => {
  console.log('Function started');
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Test database connection first
    console.log('Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('chat_logs')
      .select('count(*)')
      .limit(1);
    
    if (testError) {
      console.error('Database connection test failed:', testError);
      throw testError;
    }
    console.log('Database connection successful:', testData);

    const { messages, websiteData } = await req.json();
    const headers = Object.fromEntries(req.headers);
    const sessionId = crypto.randomUUID();

    console.log('Request received:', {
      messageCount: messages.length,
      sessionId,
      headers
    });

    // Log request details for debugging
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
    const { messages: messagesArray, sessionId: sessionIdFromBody = crypto.randomUUID() } = body;
    if (!messagesArray || !Array.isArray(messagesArray)) {
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

    // Log the user's message
    const userMessage = messagesArray[messagesArray.length - 1];
    if (userMessage.role === 'user') {
      console.log('Attempting to log user message...');
      console.log('Session ID:', sessionIdFromBody);
      console.log('IP:', headers['x-forwarded-for'] || headers['cf-connecting-ip']);
      console.log('User Agent:', headers['user-agent']);
      console.log('Message:', userMessage.content);

      const { data: logData, error: logError } = await supabase
        .from('chat_logs')
        .insert({
          session_id: sessionIdFromBody,
          ip_address: headers['x-forwarded-for'] || headers['cf-connecting-ip'],
          user_agent: headers['user-agent'],
          message_content: userMessage.content,
          role: 'user',
          metadata: {
            headers: headers,
            timestamp: new Date().toISOString()
          }
        })
        .select();

      if (logError) {
        console.error('Error logging user message:', logError);
        throw logError;
      }
      console.log('Successfully logged user message:', logData);
    }

    console.log('Preparing Gemini API request with messages:', JSON.stringify(messagesArray, null, 2));

    // Make Gemini API request
    const geminiRequestBody = {
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        ...messagesArray.map((msg: any) => ({
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

    const assistantResponse = data.candidates[0].content.parts[0].text;

    // Log the assistant's response
    console.log('Attempting to log assistant response...');
    console.log('Session ID:', sessionIdFromBody);
    console.log('Message:', assistantResponse);

    const { data: assistantLogData, error: assistantLogError } = await supabase
      .from('chat_logs')
      .insert({
        session_id: sessionIdFromBody,
        ip_address: headers['x-forwarded-for'] || headers['cf-connecting-ip'],
        user_agent: headers['user-agent'],
        message_content: assistantResponse,
        role: 'assistant',
        metadata: {
          headers: headers,
          timestamp: new Date().toISOString()
        }
      })
      .select();

    if (assistantLogError) {
      console.error('Error logging assistant message:', assistantLogError);
      throw assistantLogError;
    }
    console.log('Successfully logged assistant message:', assistantLogData);

    const result = { text: assistantResponse, sessionId: sessionIdFromBody };
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