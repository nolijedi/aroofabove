import { useState } from "react";
import { Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = `Hi! I'm your AI roofing assistant powered by Gemini. How can I help you today?`;

const SYSTEM_PROMPT = `You are a helpful and knowledgeable roofing sales assistant. Your main goal is to guide users towards getting an instant estimate using the Roofing Calculator. Here's how you should approach different topics:

1. For questions about pricing or estimates: Encourage using the Roofing Calculator for instant, accurate quotes
2. For material questions: Explain options but emphasize that specific pricing is available through the Calculator
3. For repair vs replacement: Help assess but recommend getting an estimate first
4. For timeline questions: Emphasize that getting started begins with an estimate
5. Always be professional, concise, and focused on moving towards action

Remember to:
- Always suggest using the Roofing Calculator for specific numbers
- Be enthusiastic but professional
- Keep responses under 3-4 sentences
- Focus on immediate action steps`;

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
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
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

      return data.text;
    } catch (error) {
      console.error('Error generating AI response:', error);
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