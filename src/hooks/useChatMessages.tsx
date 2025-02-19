
import { useState } from 'react';
import { Message } from '@/types/chat';
import { getBrowserSupabase } from '@/lib/supabase-singleton';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = async (content: string) => {
    setIsTyping(true);
    try {
      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date()
      };
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
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        createdAt: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Save to Supabase
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
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        createdAt: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    addMessage,
    isTyping
  };
}
