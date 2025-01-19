import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "flex items-start gap-2 max-w-[85%]",
        message.isBot ? "" : "ml-auto flex-row-reverse"
      )}
    >
      <motion.div 
        className={cn(
          "p-1.5 rounded-full bg-gradient-to-br shadow-inner",
          message.isBot 
            ? "from-roofing-orange/50 to-roofing-orange-dark/50" 
            : "from-roofing-charcoal/50 to-roofing-charcoal/30"
        )}
        whileHover={{ scale: 1.1 }}
      >
        {message.isBot ? (
          <Bot className="w-5 h-5 text-white/90" />
        ) : (
          <User className="w-5 h-5 text-white/90" />
        )}
      </motion.div>
      <motion.div
        className={cn(
          "p-3 rounded-xl shadow-sm text-base backdrop-blur-sm",
          message.isBot
            ? "bg-gradient-to-br from-white/60 to-white/50 text-roofing-charcoal"
            : "bg-gradient-to-br from-roofing-orange/50 to-roofing-orange-dark/50 text-white"
        )}
        whileHover={{ scale: 1.02 }}
      >
        {message.text}
      </motion.div>
    </motion.div>
  );
};