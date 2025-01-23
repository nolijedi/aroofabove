import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 animate-live-chat-pulse" // Added animation class here
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Button
        onClick={onClick}
        className="bg-roofing-orange/80 hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 w-[68px] h-[68px] flex flex-col items-center justify-center gap-1"
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img 
            src="/lovable-uploads/cfe74ea0-b3ce-4017-a778-51f7dd28f478.png"
            alt="Chat Icon"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xs font-medium text-white whitespace-nowrap">Live Chat</span>
        </motion.div>
      </Button>
    </motion.div>
  );
};
