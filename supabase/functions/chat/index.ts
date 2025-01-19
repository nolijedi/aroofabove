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
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      console.error('OpenAI API key is not configured')
      throw new Error('OpenAI API key is not configured')
    }

    console.log('Initializing OpenAI client...')
    const openai = new OpenAI({
      apiKey: apiKey,
    })

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages)
      throw new Error('Messages array is required')
    }

    console.log('Calling OpenAI with messages:', messages)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 150,
    })

    if (!completion.choices || completion.choices.length === 0) {
      console.error('No completion choices returned from OpenAI')
      throw new Error('Failed to generate response')
    }

    const text = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

    console.log('OpenAI response:', text)

    return new Response(
      JSON.stringify({ text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    // Check if it's an OpenAI API error
    if (error.response) {
      console.error('OpenAI API Error:', {
        status: error.response.status,
        data: error.response.data
      })
    }
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.response?.data || null
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})