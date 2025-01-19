import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
  index?: number;
}

export const ChatMessage = ({ message, index = 0 }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "flex items-start gap-2 max-w-[85%]",
        message.role === "assistant" ? "" : "ml-auto flex-row-reverse"
      )}
    >
      <motion.div 
        className={cn(
          "p-1.5 rounded-full bg-gradient-to-br shadow-inner flex items-center justify-center w-8 h-8",
          message.role === "assistant"
            ? "from-roofing-orange/50 to-roofing-orange-dark/50" 
            : "from-roofing-charcoal/50 to-roofing-charcoal/30"
        )}
        whileHover={{ scale: 1.1 }}
      >
        {message.role === "assistant" ? (
          <img 
            src="/lovable-uploads/cfe74ea0-b3ce-4017-a778-51f7dd28f478.png"
            alt="Roofing Assistant"
            className="w-5 h-5 object-contain"
          />
        ) : (
          <User className="w-5 h-5 text-white/90" />
        )}
      </motion.div>
      <motion.div
        className={cn(
          "p-3 rounded-xl shadow-sm text-base backdrop-blur-sm",
          message.role === "assistant"
            ? "bg-gradient-to-br from-white/60 to-white/50 text-roofing-charcoal"
            : "bg-gradient-to-br from-roofing-orange/50 to-roofing-orange-dark/50 text-white"
        )}
        whileHover={{ scale: 1.02 }}
      >
        {message.content}
      </motion.div>
    </motion.div>
  );
};