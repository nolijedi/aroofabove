import { X } from "lucide-react";
import { motion } from "framer-motion";

interface PromoContentProps {
  isExitIntent: boolean;
  timeLeft: number;
  onClose: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const PromoContent = ({ isExitIntent, timeLeft, onClose, onClick }: PromoContentProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative p-6 rounded-lg shadow-2xl bg-gradient-to-br from-[#8B5CF6]/80 to-[#D946EF]/80 backdrop-blur-md border border-white/10 cursor-pointer"
      onClick={onClick}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close promotion"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="text-white space-y-3">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
          {isExitIntent ? "🔥 Last Chance Deal!" : "Limited Time Offer!"}
        </h3>
        <p className="text-sm">
          {isExitIntent 
            ? "Don't miss out on saving $8,000 on average!"
            : "Get 15% off your roof estimate with code:"}
        </p>
        <div className="bg-white/10 px-4 py-2 rounded font-mono text-green-300">
          {isExitIntent ? "LASTCHANCE" : "ROOF2024"}
        </div>
        <div className="text-sm mt-2">
          Expires in:
        </div>
        <div className="font-mono text-lg text-green-300">
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>
        <p className="text-xs text-gray-200 mt-2">
          Click to get your free estimate!
        </p>
      </div>
    </motion.div>
  );
};