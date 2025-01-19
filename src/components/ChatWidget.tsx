import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatButton } from "./chat/ChatButton";
import { ChatWindow } from "./chat/ChatWindow";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hello! How can I help you with your roofing needs today?",
    isBot: true,
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState("");
  const [isHammering, setIsHammering] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    setIsHammering(true);
    setTimeout(() => setIsHammering(false), 1000);

    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: "Thank you for your message! One of our roofing experts will get back to you shortly. Is there anything specific you'd like to know about our services?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <ChatButton 
        onClick={() => setIsOpen(!isOpen)} 
        isHammering={isHammering} 
      />
      <AnimatePresence>
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