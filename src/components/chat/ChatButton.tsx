import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <motion.div
      className="fixed md:bottom-32 md:left-6 bottom-24 left-6 z-40"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.button
        onClick={onClick}
        className="bg-roofing-orange/80 hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 group w-[68px] h-[68px] flex flex-col items-center justify-center animate-live-chat-pulse"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative flex flex-col items-center gap-1">
          <div className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="2" y="4" width="20" height="3" rx="1.5" fill="white"/>
              <rect x="2" y="10" width="20" height="3" rx="1.5" fill="white"/>
              <rect x="2" y="16" width="16" height="3" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="text-xs font-medium text-white whitespace-nowrap">Live Chat</span>
        </div>
      </motion.button>
    </motion.div>
  );
};
