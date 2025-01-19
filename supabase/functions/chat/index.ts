import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SYSTEM_PROMPT } from "./prompts.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    console.log('Processing chat request with messages:', messages);

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      throw new Error('API configuration error');
    }

    // Format messages for Gemini API
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as first message
    formattedMessages.unshift({
      role: "user",
      parts: [{ text: SYSTEM_PROMPT }]
    });

    console.log('Sending request to Gemini API with formatted messages:', formattedMessages);

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 800,
            topP: 0.9,
            topK: 40
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from Gemini:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from Gemini:', data);
      throw new Error('Invalid response format from Gemini API');
    }

    return new Response(
      JSON.stringify({ text: data.candidates[0].content.parts[0].text }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred. Please try again."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});