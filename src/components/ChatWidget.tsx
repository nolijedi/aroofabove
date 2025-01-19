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
        className="fixed bottom-24 right-4 md:bottom-12 md:right-8 rounded-full p-2 bg-roofing-orange/60 hover:bg-roofing-orange-dark/80 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm scale-90"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-[10px] font-medium">Chat Now</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-4 md:bottom-28 md:right-8 w-[280px] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-roofing-orange/70 to-roofing-orange-dark/70 p-2 flex justify-between items-center backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Bot className="w-3 h-3 text-white animate-bounce" />
                <h3 className="text-white font-semibold text-xs">Roofing Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full h-5 w-5"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            <div className="h-[250px] overflow-y-auto p-2 space-y-2 bg-gradient-to-b from-roofing-cream/5 to-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "flex items-start gap-1.5 max-w-[85%]",
                    message.isBot ? "" : "ml-auto flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "p-1 rounded-full",
                    message.isBot 
                      ? "bg-gradient-to-r from-roofing-orange/80 to-roofing-orange-dark/80" 
                      : "bg-gradient-to-r from-roofing-charcoal/80 to-roofing-charcoal/60"
                  )}>
                    {message.isBot ? (
                      <Bot className="w-2 h-2 text-white" />
                    ) : (
                      <User className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-2 rounded-xl shadow-sm text-xs",
                      message.isBot
                        ? "bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm text-roofing-charcoal"
                        : "bg-gradient-to-r from-roofing-orange/80 to-roofing-orange-dark/80 backdrop-blur-sm text-white"
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200/30 p-2 bg-white/70 backdrop-blur-sm flex gap-1.5">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-2 py-1 text-xs border rounded-full focus:outline-none focus:ring-1 focus:ring-roofing-orange/50 focus:border-transparent bg-white/50"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-roofing-orange/80 to-roofing-orange-dark/80 hover:from-roofing-orange-dark/90 hover:to-roofing-orange-dark rounded-full h-6 w-6 p-0 flex items-center justify-center"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};