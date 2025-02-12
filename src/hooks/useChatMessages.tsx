import { useState } from "react";
import { supabase } from "@/lib/supabase-singleton";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const INITIAL_MESSAGE = `Hi! 👋 I'm Eve from A Roof Above. I can help you get an instant estimate or answer any roofing questions.

Would you mind sharing your name so I can better assist you?`;

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: INITIAL_MESSAGE,
      createdAt: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = async (content: string) => {
    try {
      setError(null);
      
      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Generate AI response
      setIsTyping(true);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });

      // Check if we got HTML instead of JSON (common error in production)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Received HTML instead of JSON. The API endpoint might be misconfigured.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to get response' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.message) {
        throw new Error('Invalid response format');
      }

      // Add AI response
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Save to Supabase
      try {
        await supabase.from('chat_logs').insert([
          {
            email: 'visitor@example.com',
            message: content,
            user_type: 'user',
            ip_address: '127.0.0.1'
          },
          {
            email: 'visitor@example.com',
            message: data.message,
            user_type: 'assistant',
            ip_address: 'system'
          }
        ]);
      } catch (dbError) {
        // Log but don't fail the chat if Supabase save fails
        console.error('Failed to save to Supabase:', dbError);
      }

    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process message');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your message. Please try again in a moment.",
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);

    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    error,
    addMessage,
  };
};