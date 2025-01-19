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
import { GripVertical } from "lucide-react";

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

  const ensureInViewport = () => {
    if (chatWindowRef.current) {
      const rect = chatWindowRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const navbarHeight = 80;
      const padding = 20;

      // Calculate bounds
      const maxTop = viewportHeight - rect.height - padding;
      const maxLeft = viewportWidth - rect.width - padding;

      // Adjust position if needed
      if (rect.top < navbarHeight) {
        chatWindowRef.current.style.top = `${navbarHeight + padding}px`;
      }
      if (rect.top > maxTop) {
        chatWindowRef.current.style.top = `${maxTop}px`;
      }
      if (rect.left < padding) {
        chatWindowRef.current.style.left = `${padding}px`;
      }
      if (rect.left > maxLeft) {
        chatWindowRef.current.style.left = `${maxLeft}px`;
      }
    }
  };

  useEffect(() => {
    const handleResize = () => ensureInViewport();
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
          ? "fixed left-1/2 -translate-x-1/2 bottom-28 w-[280px] h-[400px]" 
          : "w-[320px] h-[440px]"
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
      <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-roofing-orange/20 backdrop-blur-sm p-1 rounded-full cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <GripVertical className="w-4 h-4 text-roofing-orange" />
      </div>
    </motion.div>
  );

  if (isMobile) {
    return windowContent;
  }

  return (
    <Draggable
      handle=".chat-header"
      bounds="parent"
      defaultPosition={{ 
        x: Math.max(window.innerWidth / 2 - 160, 20), 
        y: Math.max(window.innerHeight / 2 - 220, 100)
      }}
      onDrag={ensureInViewport}
      onStop={ensureInViewport}
    >
      <div className="fixed z-40 group" style={{ maxHeight: 'calc(100vh - 100px)', top: '80px' }}>
        {windowContent}
      </div>
    </Draggable>
  );
};