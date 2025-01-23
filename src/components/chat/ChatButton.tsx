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
      className="fixed bottom-4 right-4 w-14 h-14 rounded-full p-0 bg-roofing-orange hover:bg-roofing-orange-dark shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
      aria-label="Toggle chat"
    >
      <div className="absolute inset-0 bg-roofing-orange rounded-full animate-phone-pulse opacity-30"></div>
      <motion.div 
        className="relative w-6 h-6"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="w-full h-full text-white"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.002l-1.315 4.863a1 1 0 001.229 1.229l4.863-1.315A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.878-.319-4.143-.891l-.506-.259-3.213.869.869-3.213-.259-.506A7.957 7.957 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          <path d="M8 13h8a1 1 0 000-2H8a1 1 0 000 2zm0-3h8a1 1 0 000-2H8a1 1 0 000 2zm0 6h5a1 1 0 000-2H8a1 1 0 000 2z"/>
        </svg>
      </motion.div>
      {isHammering && (
        <motion.img
          src="/lovable-uploads/3919685d-d81f-479f-9598-603008a61953.png"
          alt="Hammer"
          className="absolute -top-6 -right-4 w-8 h-8"
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