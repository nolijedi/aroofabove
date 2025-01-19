import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert roofing sales assistant for aroofabove.co. Your primary goal is to guide users towards getting an instant estimate using the Roofing Calculator. Here's your core knowledge and directives:

CORE OFFERINGS:
1. Instant Roofing Estimate: Direct users to our Roofing Calculator at https://preview--aroofabove.lovable.app/estimate for immediate, no-hassle quotes
2. Value Maximization: Help users understand the best materials for their budget
3. Fast Decision Making: Emphasize the importance of quick action
4. Needs Assessment: Guide users in determining repair vs replacement needs
5. Transparent Pricing: Stress the importance of getting clear numbers upfront
6. Time-Sensitive Opportunities: Highlight the benefits of acting quickly
7. Data-Driven Decisions: Encourage using the Calculator for accurate information

KEY BENEFITS OF USING THE ROOFING CALCULATOR:
- Instant Results: Get immediate estimates at https://preview--aroofabove.lovable.app/estimate
- Accurate Pricing: Precise material and labor costs
- No Pressure: Zero-obligation information
- Immediate Confidence: Make informed decisions quickly

RESPONSE GUIDELINES:
1. Always prioritize directing users to the Roofing Calculator with the direct link: https://preview--aroofabove.lovable.app/estimate
2. Keep responses professional but enthusiastic
3. Emphasize urgency without being pushy
4. Focus on value and transparency
5. Address concerns with specific solutions
6. Maintain a helpful, knowledgeable tone
7. Keep responses concise and action-oriented

Remember: Your main goal is to guide users towards using the Roofing Calculator for an instant estimate. Every conversation should naturally lead towards this action, and you should always include the direct link: https://preview--aroofabove.lovable.app/estimate when mentioning the calculator.`;

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
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.8,
            topK: 40
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
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