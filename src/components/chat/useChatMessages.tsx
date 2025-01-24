import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = "Hello! I'm your AI assistant. How can I help you today?";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTrainingMode, setIsTrainingMode] = useState(false);

  const fetchMemoryFromBackend = async () => {
    try {
      const { data, error } = await supabase
        .from('memory')
        .select('content')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching memory:', error);
        return INITIAL_MESSAGE;
      }

      return data?.content || INITIAL_MESSAGE;
    } catch (error) {
      console.error('Error fetching memory:', error);
      return INITIAL_MESSAGE;
    }
  };

  const updateMemoryInBackend = async (content: string) => {
    try {
      const { error } = await supabase
        .from('memory')
        .insert([{ content }]);

      if (error) {
        console.error('Error updating memory:', error);
      }
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const generateAIResponse = async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message, isTrainingMode },
      });

      if (error) {
        console.error('Error calling chat function:', error);
        return "I apologize, but I'm having trouble responding right now. Please try again in a moment.";
      }

      return data?.response || "I apologize, but I received an empty response. Please try again.";
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I apologize, but I'm having trouble responding right now. Please try again in a moment.";
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Check for training mode command
    if (message.toLowerCase() === "/train") {
      setIsTrainingMode(true);
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Entering training mode. Please provide the training data.",
        createdAt: new Date(),
      }]);
      return;
    }

    // Handle training mode update
    if (isTrainingMode) {
      if (message.toLowerCase() === "/done") {
        setIsTrainingMode(false);
        setMessages((prev) => [...prev, {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Training mode completed. How can I assist you?",
          createdAt: new Date(),
        }]);
        return;
      }

      const command = message;
      const updatedMemory = `Updated memory: ${command}`;
      await updateMemoryInBackend(updatedMemory);
      
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Training updated successfully. I'm now back in normal chat mode. How can I assist you further?",
        createdAt: new Date(),
      }]);
      return;
    }

    // Normal message handling
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

  useEffect(() => {
    const initializeChat = async () => {
      const memory = await fetchMemoryFromBackend();
      setMessages([{
        id: crypto.randomUUID(),
        role: "assistant",
        content: memory,
        createdAt: new Date(),
      }]);
    };
    initializeChat();
  }, []);

  return { messages, isTyping, handleSendMessage };
};