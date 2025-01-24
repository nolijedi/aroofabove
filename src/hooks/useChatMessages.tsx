import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = `Hi! 👋 I'm Eve, your roofing expert. I can help you get an instant estimate, explore premium materials, or answer any questions about your roofing project. Want to see how much you could save? 🏠✨`;

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
  const [websiteData, setWebsiteData] = useState<any>(null);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('scrape-website');
        if (error) throw error;
        setWebsiteData(data);
        console.log('Website data fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching website data:', error);
      }
    };

    fetchWebsiteData();
  }, []);

  const generateAIResponse = async (message: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: message,
            },
          ],
          websiteData: websiteData,
        },
      });

      if (error) {
        console.error('Error generating AI response:', error);
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data?.text) {
        throw new Error('Invalid response format');
      }

      return data.text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(message);
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
        createdAt: new Date(),
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        createdAt: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    handleSendMessage,
  };
};