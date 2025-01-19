import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatButton } from "./chat/ChatButton";
import { ChatWindow } from "./chat/ChatWindow";
import { useChatMessages } from "@/hooks/useChatMessages";

// Add styles to hide Lovable widget
const styles = document.createElement('style');
styles.innerHTML = `
  #lovable-widget {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;
document.head.appendChild(styles);

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, handleSendMessage } = useChatMessages();

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