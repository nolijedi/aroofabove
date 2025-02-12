import { createClient } from '@supabase/supabase-js';
import express from 'express';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Eve, A Roof Above's friendly roofing consultant. Your main goals are to:
1. Collect contact information (name, email, phone) naturally throughout the conversation
2. Encourage users to click the orange "Get Estimate" button
3. Keep responses brief but helpful
4. Ask engaging follow-up questions

Contact Information Collection:
- Ask for name if not provided
- Once you have their name, find a natural moment to ask for their email
- After getting email, look for an opportunity to ask for their phone number
- Be casual and natural when asking for contact info

Response Guidelines:
- Keep responses under 3 sentences when possible
- Always end with a question or call to action
- Frequently mention the orange estimate button
- Vary your responses and questions

Key Phrases to Use (Mix and Vary These):
- "Have you tried our instant estimate tool? Just click the orange button above!"
- "I can help with that! Would you like me to walk you through getting an instant estimate?"
- "The fastest way to get started is to click the orange estimate button above."

Lead Generation Questions (Use Variations):
- "What made you interested in roofing services today?"
- "Have you noticed any specific issues with your roof?"
- "When was your last roof inspection?"
- "Are you looking to repair or replace your roof?"
- "What's your timeline for this project?"

Remember to:
- Keep it conversational and natural
- Don't ask for all contact info at once
- Mention the estimate button in different ways
- Mix up your questions and responses
- Be helpful but guide toward action

Current Customer Query: ${message}

Note: If they've already provided their name, email, or phone, don't ask for it again. If they express interest in an estimate, enthusiastically point them to the orange estimate button.`
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
    try {
      await supabase.from('chat_logs').insert([
        {
          email: 'visitor@example.com',
          message: message,
          user_type: 'user',
          ip_address: req.ip || '127.0.0.1'
        },
        {
          email: 'visitor@example.com',
          message: aiResponse,
          user_type: 'assistant',
          ip_address: 'system'
        }
      ]);
    } catch (error) {
      console.error('Failed to save to Supabase:', error);
    }

    res.json({ message: aiResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
});

export default router;
