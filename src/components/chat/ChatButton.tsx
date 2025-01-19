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
      <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full">
        <span className="text-xs font-medium text-roofing-orange">Live Chat</span>
      </div>
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