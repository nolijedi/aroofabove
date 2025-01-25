// ChatInput.tsx
import React, { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const ChatInput = ({ onSendMessage, isTyping }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-3 border-t border-gray-100 bg-white"
    >
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="
            w-full px-3 py-2 pr-10
            bg-gray-50 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-roofing-orange/20
            disabled:opacity-50
            text-gray-800 text-sm
            placeholder-gray-400
          "
          disabled={isTyping}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!message.trim() || isTyping}
          className="
            absolute right-2
            w-7 h-7
            flex items-center justify-center
            bg-roofing-orange text-white
            rounded-lg
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-colors
            hover:bg-roofing-orange-dark
          "
        >
          <Send size={14} />
        </motion.button>
      </div>
    </form>
  );
};
