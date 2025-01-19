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

const generateRoofingResponse = (message: string): string => {
  // Keywords to look for in user messages
  const keywords = {
    estimate: "Would you like to get an instant estimate? I can help you use our Roofing Calculator to get accurate pricing right now!",
    price: "The best way to get accurate pricing is through our Roofing Calculator. Would you like me to help you get an instant estimate?",
    material: "We offer various high-quality roofing materials. To get specific pricing for different materials, let's use our Roofing Calculator. Would you like to try it now?",
    repair: "Whether you need repairs or a full replacement, I can help you determine the best solution. Let's start with a quick estimate using our Roofing Calculator.",
    time: "We can get started right away! The first step is getting an accurate estimate through our Roofing Calculator. Would you like to do that now?",
  };

  // Default response if no keywords match
  let response = "I can help you with that! The best way to start is by getting an instant estimate using our Roofing Calculator. Would you like to try it now?";

  // Check for keywords in the message
  Object.entries(keywords).forEach(([key, value]) => {
    if (message.toLowerCase().includes(key)) {
      response = value;
    }
  });

  return response;
};

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

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Simulate AI response with roofing-specific content
      setTimeout(() => {
        const aiResponse: Message = {
          role: "assistant",
          content: generateRoofingResponse(message),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
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