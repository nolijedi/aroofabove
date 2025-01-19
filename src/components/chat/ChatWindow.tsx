import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  onClose: () => void;
}

export const ChatWindow = ({
  messages,
  inputValue,
  setInputValue,
  handleSend,
  handleKeyPress,
  onClose,
}: ChatWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 150, damping: 15 }}
      className="fixed bottom-24 right-8 w-[400px] h-[600px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-[100]"
      style={{
        maxHeight: "calc(100vh - 200px)",
      }}
    >
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
      />
    </motion.div>
  );
};