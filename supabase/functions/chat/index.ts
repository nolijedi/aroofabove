import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import OpenAI from 'https://esm.sh/openai@4.20.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 150,
    })

    const text = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

    return new Response(
      JSON.stringify({ text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})