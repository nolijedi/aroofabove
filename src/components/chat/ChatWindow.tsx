import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useNavigate } from "react-router-dom";
import { useViewportBoundary } from "@/hooks/useViewportBoundary";
import { DraggableContainer } from "./DraggableContainer";
import { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
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
        transition={{ duration: 0.2 }}
        className={`
          fixed bg-white rounded-lg shadow-lg overflow-hidden flex flex-col
          ${isMobile ? 'w-[95vw] h-[80vh] bottom-20' : 'w-[400px] h-[600px] bottom-4'}
          ${isMobile ? 'left-[2.5vw]' : 'right-4'}
        `}
        style={{
          maxWidth: isMobile ? '95vw' : '400px',
          maxHeight: isMobile ? '80vh' : '600px',
          zIndex: 1000,
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