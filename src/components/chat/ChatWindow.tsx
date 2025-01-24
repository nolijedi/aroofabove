import { useRef } from "react";
import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";  
import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useViewportBoundary } from "@/hooks/useViewportBoundary";
import { DraggableContainer } from "./DraggableContainer";
import { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { ensureInViewport } = useViewportBoundary();

  const handleEstimateClick = () => {
    onClose();
    navigate("/estimate");
  };

  return (
    <DraggableContainer onDrag={ensureInViewport} onStop={ensureInViewport}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden flex flex-col ${
          isMobile 
            ? "fixed inset-x-4 bottom-24 w-auto h-[60vh]" 
            : "w-[320px] h-[400px]"
        }`}
        style={{
          maxHeight: isMobile ? 'calc(100vh - 160px)' : '400px',
        }}
      >
        <ChatHeader onClose={onClose} />
        <Button
          variant="outline"
          className="absolute top-2 right-2 z-50"
          onClick={handleEstimateClick}
        >
          Get Free Estimate
        </Button>
        <ChatMessages 
          messages={messages} 
          isTyping={isTyping}
        />
        <ChatInput 
          onSendMessage={onSendMessage}
          isTyping={isTyping}
        />
      </motion.div>
    </DraggableContainer>
  );
};