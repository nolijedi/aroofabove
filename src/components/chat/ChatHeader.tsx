import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <motion.img
          src="/images/logo-new1.png"
          alt="A Roof Above Logo"
          className="h-6 w-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="text-white font-medium">Chat with us</span>
      </div>
      
      <motion.button
        onClick={onClose}
        className="text-white/90 hover:text-white p-1.5 rounded-lg hover:bg-black/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={18} />
      </motion.button>
    </div>
  );
};