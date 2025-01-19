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

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isHammering, setIsHammering] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    // Visual feedback
    setIsHammering(true);
    setTimeout(() => setIsHammering(false), 1000);

    // Add user message
    const userMessage: Message = {
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
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
    }, 1500);
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
          />
        )}
      </AnimatePresence>
    </>
  );
};