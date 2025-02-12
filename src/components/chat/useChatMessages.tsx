import { useState, useCallback } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/lib/supabase";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SYSTEM_PROMPT = `You are Eve, the friendly roofing assistant for A Roof Above. Vary your response style between:

1. Quick, snappy answers (1-2 sentences)
2. Casual, sometimes humorous responses
3. Informative but concise explanations (2-3 sentences max)

KEY BEHAVIORS:
- Mix up your response lengths naturally
- Use emojis occasionally to keep it friendly
- Add personality but stay professional
- When relevant, suggest the estimate button with the prompt "Enter your address in the estimate calculator for an instant estimate!"
- End responses with 3 suggested questions users might want to ask`;

// Separate function for saving messages
const saveMessageToDatabase = async (message: Message) => {
  try {
    const { error } = await supabase
      .from('chat_logs')
      .insert([
        {
          message: message.content,
          user_type: message.role,
          created_at: message.createdAt.toISOString(),
        },
      ]);

    if (error) {
      console.error('Error saving message:', error);
    }
  } catch (error) {
    console.error('Error saving message:', error);
  }
};

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addInitialMessage = useCallback(() => {
    const initialMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hello! I'm your roofing assistant. How can I help you today?",
      createdAt: new Date(),
    };
    setMessages([initialMessage]);
    // Try to save the message, but don't wait for it
    saveMessageToDatabase(initialMessage).catch(console.error);
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Try to save the user message, but don't wait for it
    saveMessageToDatabase(userMessage).catch(console.error);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            ...messages.map((msg) => ({
              role: msg.role === "assistant" ? "model" : "user",
              parts: [{ text: msg.content }]
            })),
            { role: "user", parts: [{ text: content }] }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.8,
            topK: 40
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format');
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.candidates[0].content.parts[0].text,
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      // Try to save the assistant message, but don't wait for it
      saveMessageToDatabase(assistantMessage).catch(console.error);
    } catch (error) {
      console.error("Error in chat:", error);
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      // Try to save the error message, but don't wait for it
      saveMessageToDatabase(errorMessage).catch(console.error);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  return {
    messages,
    isTyping,
    handleSendMessage,
    addInitialMessage,
  };
};