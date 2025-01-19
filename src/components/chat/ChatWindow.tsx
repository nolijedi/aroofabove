import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";
import { useMediaQuery } from "@/hooks/use-mobile";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`fixed bg-white rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-50 ${
        isMobile 
          ? "inset-x-4 bottom-24 max-w-[500px] mx-auto h-[70vh]" 
          : "bottom-24 right-8 w-[380px] h-[500px]"
      }`}
    >
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={onSendMessage} isTyping={isTyping} />
    </motion.div>
  );
};