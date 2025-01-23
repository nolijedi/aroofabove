import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
  isHammering: boolean;
}

export const ChatButton = ({ onClick, isHammering }: ChatButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <Button
        onClick={onClick}
        className="w-[68px] h-[68px] rounded-full p-0 bg-roofing-orange/80 hover:bg-roofing-orange-dark shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Toggle live chat"
      >
        <div className="absolute inset-0 bg-roofing-orange rounded-full animate-phone-pulse opacity-40"></div>
        <motion.div 
          className="flex flex-col items-center justify-center space-y-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img 
            src="/lovable-uploads/180a1862-a108-4134-9eec-bd0556fb5d46.png"
            alt="Chat Icon"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xs font-medium text-white whitespace-nowrap">Live Chat</span>
        </motion.div>
      </Button>
    </motion.div>
  );
};