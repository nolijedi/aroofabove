import { useRef } from "react";
import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GripVertical } from "lucide-react";
import { useViewportBoundary } from "@/hooks/useViewportBoundary";
import { DraggableContainer } from "./DraggableContainer";

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
  const { ensureInViewport } = useViewportBoundary(chatWindowRef);

  const handleEstimateClick = () => {
    navigate('/estimate');
  };

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
      className={`bg-transparent backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden flex flex-col ${
        isMobile 
          ? "fixed left-1/2 -translate-x-1/2 bottom-28 w-[280px] h-[360px]" 
          : "w-[320px] h-[400px]"
      }`}
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

  return (
    <DraggableContainer
      onDrag={ensureInViewport}
      onStop={ensureInViewport}
    >
      {windowContent}
    </DraggableContainer>
  );
};