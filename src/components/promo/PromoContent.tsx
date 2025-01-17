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
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-lg shadow-2xl bg-white border border-roofing-orange/20 cursor-pointer w-[300px]"
      onClick={onClick}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-roofing-beige transition-colors"
        aria-label="Close promotion"
      >
        <X className="w-4 h-4 text-roofing-charcoal" />
      </button>
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-roofing-orange">
          {isExitIntent ? "🔥 Last Chance Deal!" : "Limited Time Offer!"}
        </h3>
        <p className="text-sm text-roofing-charcoal">
          {isExitIntent 
            ? "Don't miss out on saving $8,000 on average!"
            : "Get 15% off your roof estimate with code:"}
        </p>
        <div className="bg-roofing-beige px-4 py-2 rounded font-mono text-roofing-orange-dark">
          {isExitIntent ? "LASTCHANCE" : "ROOF2024"}
        </div>
        <div className="text-sm mt-2 text-roofing-charcoal">
          Expires in:
        </div>
        <div className="font-mono text-lg text-roofing-orange-dark">
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>
        <p className="text-xs text-roofing-charcoal/80 mt-2">
          Click to get your free estimate!
        </p>
      </div>
    </motion.div>
  );
};