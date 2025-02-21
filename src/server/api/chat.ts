
import express, { Request, Response } from 'express';
import { getBrowserSupabase } from '@/lib/supabase-singleton';

const router = express.Router();

export const chatHandler = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const supabase = getBrowserSupabase();
    
    // Save the message to the chat_logs table
    const { error } = await supabase.from('chat_logs').insert([
      {
        message,
        user_type: 'user',
        email: 'visitor@example.com',
        ip_address: req.ip || 'unknown'
      }
    ]);

    if (error) {
      console.error('Error saving to chat_logs:', error);
      return res.status(500).json({ error: 'Failed to save chat log' });
    }

    // TODO: Implement actual chat response logic
    const response = "Thank you for your message. I'm a placeholder response.";

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

router.post('/chat', chatHandler);

export default router;
