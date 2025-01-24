import { motion } from "framer-motion";

export const ChatLoadingIndicator = () => {
  return (
    <div className="flex items-center gap-2 pl-2">
      <motion.div
        className="w-6 h-6"
        style={{
          transformOrigin: "bottom right",
          transform: "scaleX(-1)" // Flip horizontally
        }}
        animate={{
          rotate: [0, -20, 0], // Adjusted rotation for flipped hammer
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/lovable-uploads/hammer.svg" 
          alt="Typing"
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
        />
      </motion.div>
      <span className="text-sm text-gray-500">typing...</span>
    </div>
  );
};
