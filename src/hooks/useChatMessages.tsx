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

      if (error) throw error;
      return data.text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  };

  const addMessage = async (content: string, role: "user" | "assistant" = "user") => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      createdAt: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    if (role === "user") {
      setIsTyping(true);
      try {
        const aiResponse = await generateAIResponse(content);
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: aiResponse,
          createdAt: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error in chat:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return {
    messages,
    isTyping,
    addMessage,
  };
};