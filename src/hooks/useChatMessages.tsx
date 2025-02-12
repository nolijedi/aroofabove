import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-singleton';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = async (content: string) => {
    setIsLoading(true);
    try {
      // Add user message
      const userMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      // Get API URL based on environment
      const apiUrl = '/api/chat';

      // Call chat API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add assistant message
      const assistantMessage: Message = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, assistantMessage]);

      // Save to Supabase (optional, since server already saves)
      const supabase = getBrowserSupabase();
      try {
        await supabase.from('chat_logs').insert([
          {
            email: 'visitor@example.com',
            message: content,
            user_type: 'user',
            ip_address: 'browser'
          }
        ]);
      } catch (error) {
        console.error('Failed to save to Supabase:', error);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    addMessage,
    isLoading
  };
}