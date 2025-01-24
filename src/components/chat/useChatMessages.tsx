import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = `Welcome to A Roof Above! How can I help you with your roofing project today?`;

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [websiteData, setWebsiteData] = useState<any>(null);

  // Fetch Website Data (API Integration)
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-website-data');
        if (error) throw error;
        setWebsiteData(data);
        console.log('Website data fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching website data:', error);
      }
    };

    fetchWebsiteData();
  }, []);

  // Fetch stored memory
  const fetchMemoryFromBackend = async () => {
    try {
      const { data, error } = await supabase
        .from('memory')
        .select('content')
        .single();
      if (error) throw error;
      console.log('Fetched memory:', data);
      return data?.content || INITIAL_MESSAGE;
    } catch (error) {
      console.error('Error fetching memory:', error);
      return INITIAL_MESSAGE; // Fallback to initial message if there's an error
    }
  };

  // Update memory in backend
  const updateMemoryInBackend = async (newMemory: string) => {
    try {
      const { data, error } = await supabase
        .from('memory')
        .upsert({ content: newMemory }, { onConflict: ['id'] });
      if (error) throw error;
      console.log('Memory updated successfully:', data);
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  // Generate AI response, integrating website data
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
          websiteData: websiteData, // Include website-specific data for GPT API to reference
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

  // Handle user messages
  const handleUserMessage = async (message: string) => {
    if (message.startsWith("master:")) {
      const command = message.slice(7).trim();
      
      // Update memory based on the "master" command
      const updatedMemory = `Updated memory: ${command}`;
      await updateMemoryInBackend(updatedMemory);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Training updated successfully. I'm now back in normal chat mode. How can I assist you further?",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // Normal message handling
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

  // Initialize chat memory when the component mounts
  useEffect(() => {
    const initializeChat = async () => {
      const memory = await fetchMemoryFromBackend();
      setMessages([
        {
          role: "assistant",
          content: memory,
          timestamp: new Date(),
        },
      ]);
    };
    initializeChat();
  }, []);

  return {
    messages,
    isTyping,
    handleSendMessage: handleUserMessage,
  };
};
