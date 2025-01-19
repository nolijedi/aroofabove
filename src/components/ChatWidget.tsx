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
        className="fixed bottom-28 right-4 md:bottom-16 md:right-8 rounded-full p-1.5 bg-roofing-orange/40 hover:bg-roofing-orange-dark/60 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 group backdrop-blur-sm scale-75"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-3 h-3 text-white/90" />
        <span className="text-[8px] font-medium text-white/90">Chat Now</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-4 md:bottom-32 md:right-8 w-[240px] bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-roofing-orange/50 to-roofing-orange-dark/50 p-1.5 flex justify-between items-center backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <Bot className="w-2.5 h-2.5 text-white animate-bounce" />
                <h3 className="text-white font-semibold text-[10px]">Roofing Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full h-4 w-4"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </div>

            <div className="h-[200px] overflow-y-auto p-2 space-y-2 bg-gradient-to-b from-roofing-cream/5 to-transparent">
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
                  <div className={cn(
                    "p-1 rounded-full bg-gradient-to-br shadow-inner",
                    message.isBot 
                      ? "from-roofing-orange/70 to-roofing-orange-dark/70 animate-pulse" 
                      : "from-roofing-charcoal/70 to-roofing-charcoal/50"
                  )}>
                    {message.isBot ? (
                      <Bot className="w-1.5 h-1.5 text-white/90" />
                    ) : (
                      <User className="w-1.5 h-1.5 text-white/90" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-1.5 rounded-xl shadow-sm text-[10px] backdrop-blur-sm transition-all duration-300 hover:scale-105",
                      message.isBot
                        ? "bg-gradient-to-br from-white/80 to-white/70 text-roofing-charcoal"
                        : "bg-gradient-to-br from-roofing-orange/70 to-roofing-orange-dark/70 text-white"
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200/30 p-1.5 bg-white/50 backdrop-blur-sm flex gap-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-2 py-0.5 text-[10px] border rounded-full focus:outline-none focus:ring-1 focus:ring-roofing-orange/30 focus:border-transparent bg-white/40"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-roofing-orange/70 to-roofing-orange-dark/70 hover:from-roofing-orange-dark/80 hover:to-roofing-orange-dark/90 rounded-full h-5 w-5 p-0 flex items-center justify-center"
              >
                <Send className="w-2.5 h-2.5 text-white/90" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};