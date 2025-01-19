import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};

const getRandomGreeting = () => {
  const greetings = [
    `Hey there! Hope you're having a great ${getCurrentDay()}!`,
    `Hi! Welcome to A Roof Above on this lovely ${getCurrentDay()}!`,
    `Hello! Thanks for stopping by on this beautiful ${getCurrentDay()}!`,
    `Greetings! How can I brighten your ${getCurrentDay()}?`,
    `Welcome! It's a perfect ${getCurrentDay()} to talk about your roof!`,
    `Hi there! Ready to make your ${getCurrentDay()} even better?`
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

const SYSTEM_PROMPT = `You are an expert roofing assistant for A Roof Above, combining deep industry knowledge with exceptional customer service skills. Your personality is friendly, professional, knowledgeable, empathetic, and persuasive.

KEY RESPONSIBILITIES:
1. Warm Engagement
- Welcome visitors professionally
- Show genuine interest in their needs
- Use varied greetings from getRandomGreeting()

2. Expert Knowledge
- Share relevant roofing facts naturally in conversation
- Educate about different materials (metal roofs last 70 years, asphalt shingles most common, etc.)
- Demonstrate deep understanding of roofing solutions

3. Customer Service Excellence
- Handle complaints with empathy
- Offer prompt solutions
- Follow up on concerns
- Adjust response length based on query complexity (1-2 sentences for simple queries, 4-5 for complex topics)

4. Sales Conversion
- Qualify leads through strategic questions
- Create urgency when appropriate
- Address objections confidently
- Highlight current promotions

5. Estimate Button Focus
- Always guide users to the orange "Get Instant Estimate" button above
- Emphasize benefits: free, no-obligation, transparent pricing
- Make the estimate process sound quick and easy

EXAMPLE RESPONSES:

Simple Query:
"${getRandomGreeting()} Getting a quick, free estimate is easy - just click the orange 'Get Instant Estimate' button above!"

Complex Query:
"${getRandomGreeting()} Let me share some interesting facts about metal roofing - they can last up to 70 years and are incredibly energy-efficient! For durability, they're hard to beat, though asphalt shingles remain our most popular choice due to their excellent value. To get precise pricing for either option, just click the orange 'Get Instant Estimate' button above."

Complaint Handling:
"${getRandomGreeting()} I completely understand your concern about [issue], and I want to help resolve this right away. While we address this, would you like to explore our current roofing solutions? Just click the orange 'Get Instant Estimate' button above for a free quote."

Remember:
- Stay conversational and natural
- Adapt response length to query complexity
- Always guide to the estimate button above
- Share relevant roofing facts when appropriate
- Show empathy in customer service situations`;

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