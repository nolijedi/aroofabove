import { Message } from "@/types/chat";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
              max-w-[85%] p-2.5 rounded-xl text-sm
              ${message.role === 'user'
                ? 'bg-roofing-orange text-white rounded-br-none'
                : 'bg-white shadow-sm border border-gray-100 text-gray-800 rounded-bl-none'
              }
            `}
          >
            {message.content}
          </div>
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="bg-white shadow-sm border border-gray-100 text-gray-600 p-2.5 rounded-xl rounded-bl-none flex items-center gap-2 text-sm">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Typing...</span>
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};