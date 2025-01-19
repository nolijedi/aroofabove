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
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 rounded-full px-6 py-6 bg-roofing-orange hover:bg-roofing-orange-dark shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="text-sm font-medium">Chat Now</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 right-4 md:bottom-24 md:right-8 w-[calc(100%-2rem)] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-white animate-bounce" />
                <h3 className="text-white font-semibold">Roofing Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-roofing-cream/20 to-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "flex items-start gap-2 max-w-[85%]",
                    message.isBot ? "" : "ml-auto flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "p-1 rounded-full",
                    message.isBot ? "bg-roofing-orange" : "bg-roofing-charcoal"
                  )}>
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl shadow-md",
                      message.isBot
                        ? "bg-white text-roofing-charcoal"
                        : "bg-roofing-orange text-white"
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4 bg-white flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-roofing-orange focus:border-transparent"
              />
              <Button
                onClick={handleSend}
                className="bg-roofing-orange hover:bg-roofing-orange-dark rounded-full px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};