import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const ChatInput = ({ onSendMessage, isTyping }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200/30 p-2 bg-white/50 backdrop-blur-sm"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-1.5 text-sm rounded-full border border-gray-200/50 focus:outline-none focus:ring-1 focus:ring-roofing-orange focus:border-transparent bg-white/80 placeholder:text-gray-400"
          disabled={isTyping}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            disabled={!message.trim() || isTyping}
            className="rounded-full w-8 h-8 p-0 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark hover:from-roofing-orange-dark hover:to-roofing-orange shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </motion.div>
      </div>
    </form>
  );
};