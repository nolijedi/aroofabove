import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { ChatWindow } from "./ChatWindow";
import { Message } from "@/types/chat";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_MESSAGE = `Hi! 👋 I'm Eve, your roofing expert. I can help you get an instant estimate, explore premium materials, or answer any questions about your roofing project. Want to see how much you could save? 🏠✨`;

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: INITIAL_MESSAGE,
      createdAt: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [websiteData, setWebsiteData] = useState<any>(null);
  const navigate = useNavigate();

  const generateAIResponse = async (message: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          websiteData: websiteData,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (!data?.text) throw new Error('Invalid response format');

      return data.text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  };

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      // Get AI response
      const aiResponse = await generateAIResponse(content);

      // Add AI response
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Check for actions in the response
      const lowerResponse = aiResponse.toLowerCase();
      if (lowerResponse.includes('estimate') || lowerResponse.includes('quote')) {
        setTimeout(() => navigate('/estimate'), 1500);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I'm having trouble right now. Please call us at (555) 123-4567 for immediate assistance.",
          createdAt: new Date(),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, websiteData, navigate]);

  const handleClose = () => {
    setIsOpen(false);
    // Reset messages when chat is closed
    setTimeout(() => {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: INITIAL_MESSAGE,
          createdAt: new Date(),
        }
      ]);
    }, 300);
  };

  const toggleChat = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <motion.button
        onClick={toggleChat}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0.4, 1, 0.4],
          scale: [0.85, 1.1, 0.85],
        }}
        whileHover={{ 
          scale: 1.2,
          opacity: 1,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className={`
          fixed bottom-[120px] right-6
          z-[100]
          flex flex-col items-center justify-center
          w-16 h-16 rounded-full
          bg-gradient-to-br from-roofing-orange/90 to-roofing-orange-dark/90
          shadow-lg hover:shadow-xl
          transition-all duration-300
          group
        `}
      >
        <MessageSquare className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
        <span className="text-xs font-medium text-white whitespace-nowrap mt-1">Chat Live</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            onClose={handleClose}
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        )}
      </AnimatePresence>
    </>
  );
};
