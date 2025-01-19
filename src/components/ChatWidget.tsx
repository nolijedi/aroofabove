import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        className="fixed bottom-36 right-4 md:bottom-24 md:right-8 rounded-full p-1 bg-roofing-orange/20 hover:bg-roofing-orange-dark/40 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 group backdrop-blur-sm scale-50"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-3 h-3 text-white/90" />
        <span className="text-[8px] font-medium text-white/90">Chat Now</span>
        {isHammering && (
          <motion.img
            src="/lovable-uploads/a941ea90-1b0d-4427-9ee9-3fb213b016a6.png"
            alt="Hammer"
            className="absolute -top-4 -right-4 w-6 h-6"
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
            className="fixed bottom-48 right-4 md:bottom-36 md:right-8 w-[200px] bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-roofing-orange/30 to-roofing-orange-dark/30 p-1 flex justify-between items-center backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <Bot className="w-2 h-2 text-white animate-bounce" />
                <h3 className="text-white font-semibold text-[8px]">Roofing Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full h-3 w-3"
              >
                <X className="w-2 h-2" />
              </Button>
            </div>

            <div className="h-[150px] overflow-y-auto p-1.5 space-y-1.5 bg-gradient-to-b from-roofing-cream/5 to-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "flex items-start gap-1 max-w-[85%]",
                    message.isBot ? "" : "ml-auto flex-row-reverse"
                  )}
                >
                  <motion.div 
                    className={cn(
                      "p-0.5 rounded-full bg-gradient-to-br shadow-inner",
                      message.isBot 
                        ? "from-roofing-orange/50 to-roofing-orange-dark/50" 
                        : "from-roofing-charcoal/50 to-roofing-charcoal/30"
                    )}
                    whileHover={{ scale: 1.1 }}
                  >
                    {message.isBot ? (
                      <Bot className="w-1.5 h-1.5 text-white/90" />
                    ) : (
                      <User className="w-1.5 h-1.5 text-white/90" />
                    )}
                  </motion.div>
                  <motion.div
                    className={cn(
                      "p-1 rounded-xl shadow-sm text-[8px] backdrop-blur-sm",
                      message.isBot
                        ? "bg-gradient-to-br from-white/60 to-white/50 text-roofing-charcoal"
                        : "bg-gradient-to-br from-roofing-orange/50 to-roofing-orange-dark/50 text-white"
                    )}
                    whileHover={{ scale: 1.02 }}
                  >
                    {message.text}
                  </motion.div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200/30 p-1 bg-white/30 backdrop-blur-sm flex gap-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-1.5 py-0.5 text-[8px] border rounded-full focus:outline-none focus:ring-1 focus:ring-roofing-orange/30 focus:border-transparent bg-white/30"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-roofing-orange/50 to-roofing-orange-dark/50 hover:from-roofing-orange-dark/60 hover:to-roofing-orange-dark/70 rounded-full h-4 w-4 p-0 flex items-center justify-center"
              >
                <Send className="w-2 h-2 text-white/90" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};