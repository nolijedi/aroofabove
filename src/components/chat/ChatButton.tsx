import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatMessages } from "@/hooks/useChatMessages";

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { messages, isTyping, addMessage } = useChatMessages();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    await addMessage(content);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-[100]"
          >
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              onClose={handleClose}
              isTyping={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={isOpen ? handleClose : handleOpen}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0.4, 1, 0.4],
          scale: [0.85, 1.1, 0.85],
        }}
        whileHover={{ 
          scale: 1.2,
          opacity: 1,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className={`
          fixed bottom-[120px] right-6
          z-[100]
          flex flex-col items-center justify-center
          w-16 h-16 rounded-full
          bg-gradient-to-br from-roofing-orange/90 to-roofing-orange-dark/90
          shadow-lg hover:shadow-xl
          transition-all duration-300
          group
        `}
      >
        <MessageSquare className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
        <span className="text-xs font-medium text-white whitespace-nowrap mt-1">Chat Live</span>
      </motion.button>
    </>
  );
};
