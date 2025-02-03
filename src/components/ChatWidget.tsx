import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatButton } from "./chat/ChatButton";
import { ChatWindow } from "./chat/ChatWindow";
import { useChatMessages } from "@/hooks/useChatMessages";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, addMessage } = useChatMessages();

  // Close chat when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Chat Button */}
      <div onClick={() => setIsOpen(!isOpen)}>
        <ChatButton />
      </div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSendMessage={addMessage}
            onClose={() => setIsOpen(false)}
            isTyping={isTyping}
          />
        )}
      </AnimatePresence>
    </>
  );
};