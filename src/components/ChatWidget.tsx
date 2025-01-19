import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatButton } from "./chat/ChatButton";
import { ChatWindow } from "./chat/ChatWindow";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE = {
  text: "Hello! I'm your roofing assistant. How can I help you today?",
  isBot: true,
  timestamp: new Date()
};

// Using Web Crypto API instead of Node's crypto
const generateHash = async (userId: string, timestamp: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(userId + timestamp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isHammering, setIsHammering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    // Visual feedback
    setIsHammering(true);
    setIsLoading(true);
    setTimeout(() => setIsHammering(false), 1000);

    // Add user message
    const userMessage: Message = {
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    try {
      // Generate authentication hash
      const timestamp = new Date().toISOString();
      const userId = 'nolijedi'; // This should ideally come from your auth system
      const hash = await generateHash(userId, timestamp);

      // Here you would typically make an API call to your AI service
      // using the generated hash for authentication
      console.log('Authentication hash generated:', hash);
      
      // For now, we'll keep the existing bot responses
      setTimeout(() => {
        const botResponses = [
          "I'd be happy to help you with your roofing needs. Could you tell me more about your project?",
          "Thank you for reaching out! What specific roofing services are you interested in?",
          "I understand you have questions about roofing. Would you like to schedule a free inspection?",
          "We offer comprehensive roofing solutions. What type of roof do you currently have?",
        ];

        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botMessage: Message = {
          text: randomResponse,
          isBot: true,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error generating hash:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            handleKeyPress={handleKeyPress}
            onClose={() => setIsOpen(false)}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </>
  );
};
