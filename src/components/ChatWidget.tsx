import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatButton } from "./chat/ChatButton";
import { ChatWindow } from "./chat/ChatWindow";
import { toast } from "@/components/ui/use-toast";
import { Message } from "@/types/chat";

const INITIAL_MESSAGE = `Welcome to the Ultimate Roofing Sales Assistant! Ready to get your roofing project off the ground? Let's talk about how I can help you get the best deal, the best service, and the best results.

I can help you with:
• Instant Roofing Estimates
• Material Selection
• Cost Optimization
• Project Planning
• Special Deals & Offers

How can I assist you today?`;

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

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
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
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
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

  return (
    <>
      <ChatButton 
        onClick={() => setIsOpen(!isOpen)}
        isHammering={isOpen}
      />
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            onClose={() => setIsOpen(false)}
            isTyping={isTyping}
          />
        )}
      </AnimatePresence>
    </>
  );
};