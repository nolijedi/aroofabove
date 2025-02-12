import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Eve, a friendly and knowledgeable roofing expert who helps customers with roofing estimates and questions. Keep responses focused on roofing topics.

User: ${message}`
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Save to Supabase
    await supabase.from('chat_logs').insert([
      {
        email: 'visitor@example.com',
        message: message,
        user_type: 'user',
        ip_address: '127.0.0.1'
      },
      {
        email: 'visitor@example.com',
        message: aiResponse,
        user_type: 'assistant',
        ip_address: 'system'
      }
    ]);

    return new Response(JSON.stringify({ message: aiResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
