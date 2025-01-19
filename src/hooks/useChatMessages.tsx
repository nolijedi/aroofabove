import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = `Welcome to A Roof Above! How can I help you with your roofing project today?`;

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_MESSAGE,
      timestamp: new Date(),
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
        toast({
          title: "Error",
          description: "Failed to load website information. Chat will continue with limited context.",
          variant: "destructive",
        });
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
      toast({
        title: "Connection Error",
        description: error.message || "Having trouble connecting. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(message);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
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