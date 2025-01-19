import { User } from "lucide-react";
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
        "flex items-start gap-1.5 max-w-[85%] group",
        message.role === "assistant" ? "" : "ml-auto flex-row-reverse"
      )}
    >
      <motion.div 
        className={cn(
          "p-1 rounded-full bg-gradient-to-br shadow-sm flex items-center justify-center w-6 h-6",
          message.role === "assistant"
            ? "from-roofing-orange to-roofing-orange-dark" 
            : "from-roofing-charcoal to-roofing-charcoal/80"
        )}
        whileHover={{ scale: 1.1 }}
      >
        {message.role === "assistant" ? (
          <img 
            src="/lovable-uploads/cfe74ea0-b3ce-4017-a778-51f7dd28f478.png"
            alt="Roofing Assistant"
            className="w-4 h-4 object-contain"
          />
        ) : (
          <User className="w-4 h-4 text-white/90" />
        )}
      </motion.div>
      <div
        className={cn(
          "p-2 rounded-xl shadow-sm text-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-md",
          message.role === "assistant"
            ? "bg-gradient-to-br from-white/80 to-white/60 text-roofing-charcoal border border-white/20"
            : "bg-gradient-to-br from-roofing-orange to-roofing-orange-dark text-white"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
};