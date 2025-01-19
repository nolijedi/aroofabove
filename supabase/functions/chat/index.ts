import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import OpenAI from 'https://esm.sh/openai@4.20.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiKey) {
      console.error('OpenAI API key is not configured')
      throw new Error('OpenAI API key is not configured')
    }

    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages)
      throw new Error('Invalid messages format')
    }

    console.log('Processing chat request with messages:', JSON.stringify(messages))

    const openai = new OpenAI({
      apiKey: openaiKey
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    console.log('Received response from OpenAI:', completion.choices[0])

    return new Response(
      JSON.stringify({ text: completion.choices[0].message.content }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    
    let errorMessage = 'An error occurred while processing your request.'
    if (error.message.includes('API key')) {
      errorMessage = 'There was an issue with the API configuration. Please try again later.'
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message 
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})