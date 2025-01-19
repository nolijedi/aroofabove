import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessages } from "./chat/ChatMessages";
import { ChatInput } from "./chat/ChatInput";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isHammering, setIsHammering] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    setIsHammering(true);
    setTimeout(() => setIsHammering(false), 1000);

    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage: Message = {
        text: "Thank you for reaching out! How can I help you with your roofing needs?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-36 right-4 md:bottom-24 md:right-8 rounded-full p-4 bg-roofing-orange/20 hover:bg-roofing-orange-dark/40 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-6 h-6 text-white/90" />
        <span className="text-base font-medium text-white/90">Chat Now</span>
        {isHammering && (
          <motion.img
            src="/lovable-uploads/a941ea90-1b0d-4427-9ee9-3fb213b016a6.png"
            alt="Hammer"
            className="absolute -top-8 -right-8 w-14 h-14"
            animate={{
              rotate: [0, -45, 0],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: 2,
              ease: "easeInOut",
            }}
          />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-48 right-4 md:bottom-36 md:right-8 w-[350px] bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-50"
          >
            <ChatHeader onClose={() => setIsOpen(false)} />
            <ChatMessages messages={messages} />
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSend={handleSend}
              handleKeyPress={handleKeyPress}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};