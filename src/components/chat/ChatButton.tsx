import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 1, 0.4],
        scale: [0.85, 1.1, 0.85],
      }}
      whileHover={{ 
        scale: 1.2,
        rotate: 360,
        opacity: 1,
        transition: { duration: 0.5 }
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className={`
        fixed bottom-[120px] left-6
        z-[100]
        flex flex-col items-center justify-center
        w-[68px] h-[68px] rounded-full
        bg-gradient-to-br from-roofing-orange to-roofing-orange-dark
        shadow-lg hover:shadow-xl
        transition-all duration-300
        group
      `}
    >
      <div className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-300">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="2" y="4" width="20" height="3" rx="1.5" fill="white"/>
          <rect x="2" y="10" width="20" height="3" rx="1.5" fill="white"/>
          <rect x="2" y="16" width="16" height="3" rx="1.5" fill="white"/>
        </svg>
      </div>
      <span className="text-xs font-medium text-white whitespace-nowrap mt-1">Live Chat</span>
    </motion.button>
  );
};
