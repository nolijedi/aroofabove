import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";
import { useMediaQuery } from "@/hooks/use-mobile";
import Draggable from "react-draggable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleEstimateClick = () => {
    navigate('/estimate');
  };

  // Function to ensure the chat window stays within viewport bounds
  const ensureInViewport = () => {
    if (chatWindowRef.current) {
      const rect = chatWindowRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const navbarHeight = 80; // Navbar height

      if (rect.top < navbarHeight) {
        chatWindowRef.current.style.top = `${navbarHeight}px`;
      }
      if (rect.bottom > viewportHeight) {
        chatWindowRef.current.style.top = `${viewportHeight - rect.height}px`;
      }
      if (rect.left < 0) {
        chatWindowRef.current.style.left = '0px';
      }
      if (rect.right > viewportWidth) {
        chatWindowRef.current.style.left = `${viewportWidth - rect.width}px`;
      }
    }
  };

  // Add resize listener to ensure chat stays in viewport
  useEffect(() => {
    const handleResize = () => {
      ensureInViewport();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const windowContent = (
    <motion.div
      ref={chatWindowRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden flex flex-col ${
        isMobile 
          ? "fixed left-4 right-4 bottom-28 max-w-[280px] mx-auto h-[420px]" 
          : "w-[280px] h-[480px]"
      }`}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(253,225,211,0.9) 100%)",
      }}
    >
      <ChatHeader onClose={onClose} />
      <div className="px-3 py-2">
        <Button 
          onClick={handleEstimateClick}
          className="w-full bg-roofing-orange hover:bg-roofing-orange-dark text-white font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Get Instant Estimate
        </Button>
      </div>
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={onSendMessage} isTyping={isTyping} />
    </motion.div>
  );

  if (isMobile) {
    return windowContent;
  }

  return (
    <Draggable
      handle=".chat-header"
      bounds="parent"
      defaultPosition={{ x: window.innerWidth - 320, y: Math.min(window.innerHeight - 640, window.innerHeight - 100) }}
      onDrag={ensureInViewport}
      onStop={ensureInViewport}
    >
      <div className="fixed z-40" style={{ maxHeight: 'calc(100vh - 80px)', top: '80px' }}>
        {windowContent}
      </div>
    </Draggable>
  );
};