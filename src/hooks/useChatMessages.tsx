import { useState } from "react";
import { Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = `Hi! I'm your AI roofing assistant. How can I help you with your roofing project today?`;

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
        },
      });

      if (error) {
        console.error('Error generating AI response:', error);
        throw error;
      }

      if (!data?.text) {
        throw new Error('Invalid response format');
      }

      return data.text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: "Connection Error",
        description: "Having trouble connecting to the AI assistant. Please try again.",
        variant: "destructive",
      });
      return "I apologize, but I'm having trouble connecting right now. Would you like to use our Roofing Calculator to get an instant estimate while we resolve this?";
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
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
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