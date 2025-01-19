import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatButton } from "./chat/ChatButton";
import { ChatWindow } from "./chat/ChatWindow";
import { toast } from "./ui/use-toast";

const CHATBASE_IFRAME_URL = "https://www.chatbase.co/chatbot-iframe/FmTI1L5ssl5lbyiEnur4r";
const SECRET_KEY = 'b1ow6vd8cct46fxxu5hy3f8a73fffh53';
const USER_ID = 'nolijedi';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHammering, setIsHammering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const generateHash = async (secret: string, userId: string) => {
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const data = encoder.encode(userId);
      const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, data);
      return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch (error) {
      console.error('Error generating hash:', error);
      throw error;
    }
  };

  const initChat = async () => {
    try {
      setIsLoading(true);
      const hash = await generateHash(SECRET_KEY, USER_ID);
      console.log('Generated HMAC hash:', hash);
      
      // In a real application, you would verify the hash with your backend
      // For now, we'll simulate a successful authentication
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Authentication failed:', error);
      toast({
        title: "Error",
        description: "Failed to initialize chat. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      initChat();
    }
  }, [isOpen, isAuthenticated]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsHammering(true);
      setTimeout(() => setIsHammering(false), 1000);
    }
  };

  return (
    <>
      <ChatButton 
        onClick={toggleChat} 
        isHammering={isHammering} 
      />
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <ChatWindow
            onClose={() => setIsOpen(false)}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            iframeUrl={CHATBASE_IFRAME_URL}
          />
        )}
      </AnimatePresence>
    </>
  );
};