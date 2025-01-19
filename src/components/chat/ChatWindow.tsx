import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";
import { useMediaQuery } from "@/hooks/use-mobile";
import Draggable from "react-draggable";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const windowContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden ${
        isMobile 
          ? "fixed inset-x-4 bottom-20 max-w-[280px] mx-auto h-[320px]"
          : "w-[280px] h-[320px]"
      }`}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(253,225,211,0.9) 100%)",
      }}
    >
      <ChatHeader onClose={onClose} />
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
      defaultPosition={{ x: window.innerWidth - 320, y: window.innerHeight - 420 }}
    >
      <div className="fixed z-40" style={{ cursor: 'move' }}>
        {windowContent}
      </div>
    </Draggable>
  );
};