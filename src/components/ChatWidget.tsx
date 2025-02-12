import { useEffect } from "react";
import { ChatButton } from "./chat/ChatButton";

export const ChatWidget = () => {
  // Close chat when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const chatButton = document.querySelector('[data-chat-button]');
        if (chatButton) {
          (chatButton as HTMLButtonElement).click();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return <ChatButton />;
};