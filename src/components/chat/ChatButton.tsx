import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
  isHammering: boolean;
}

export const ChatButton = ({ onClick, isHammering }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 rounded-full p-4 bg-roofing-orange hover:bg-roofing-orange-dark shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group z-50"
      aria-label="Toggle chat"
    >
      <img 
        src="/lovable-uploads/dd8b00d4-1c0e-4313-828e-ccc65c05d63a.png" 
        alt="Chat" 
        className="w-6 h-6"
      />
      <span className="text-base font-medium text-white">Chat Now</span>
      {isHammering && (
        <motion.img
          src="/lovable-uploads/3919685d-d81f-479f-9598-603008a61953.png"
          alt="Hammer"
          className="absolute -top-12 -right-8 w-16 h-16"
          animate={{
            rotate: [0, -45, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: 2,
            ease: "easeInOut",
          }}
        />
      )}
    </Button>
  );
};