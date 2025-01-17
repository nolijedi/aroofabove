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
      className="relative p-6 rounded-lg shadow-2xl bg-gradient-to-br from-roofing-beige to-white border-2 border-roofing-orange/30 cursor-pointer w-[300px] backdrop-blur-sm"
      style={{
        boxShadow: '0 4px 32px rgba(249, 115, 22, 0.15)',
      }}
      onClick={onClick}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-roofing-beige/80 transition-colors duration-300"
        aria-label="Close promotion"
      >
        <X className="w-4 h-4 text-roofing-orange" />
      </button>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-roofing-orange bg-gradient-to-r from-roofing-orange-dark to-roofing-orange bg-clip-text text-transparent">
          {isExitIntent ? "🔥 Last Chance Deal!" : "Limited Time Offer!"}
        </h3>
        <p className="text-sm text-roofing-charcoal/90 leading-relaxed">
          {isExitIntent 
            ? "Don't miss out on saving $8,000 on average!"
            : "Get 15% off your roof estimate with code:"}
        </p>
        <div className="bg-gradient-to-r from-roofing-beige to-roofing-cream px-4 py-2.5 rounded-md font-mono text-roofing-orange-dark border border-roofing-orange/20 shadow-sm">
          {isExitIntent ? "LASTCHANCE" : "ROOF2024"}
        </div>
        <div className="text-sm mt-2 text-roofing-charcoal/80">
          Expires in:
        </div>
        <div className="font-mono text-lg font-semibold bg-gradient-to-r from-roofing-orange-dark to-roofing-orange bg-clip-text text-transparent">
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>
        <p className="text-xs text-roofing-charcoal/70 mt-2">
          Click to get your free estimate!
        </p>
      </div>
    </motion.div>
  );
};