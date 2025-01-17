import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      className="relative p-6 rounded-lg shadow-2xl bg-gradient-to-br from-roofing-beige via-white to-roofing-cream border-2 border-roofing-orange/30 w-[320px] backdrop-blur-sm"
      style={{
        boxShadow: '0 4px 32px rgba(249, 115, 22, 0.15)',
      }}
    >
      {/* Larger, more prominent close button */}
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 p-3 rounded-full bg-white shadow-lg hover:bg-roofing-beige/80 transition-all duration-300 border-2 border-roofing-orange/30 group"
        aria-label="Close promotion"
      >
        <X className="w-8 h-8 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
      </button>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange-dark via-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
          {isExitIntent ? "🔥 Last Chance Deal!" : "Limited Time Offer!"}
        </h3>
        
        <p className="text-sm text-roofing-charcoal/90 leading-relaxed">
          {isExitIntent 
            ? "Don't miss out on saving $8,000 on average!"
            : "Get 15% off your roof estimate with code:"}
        </p>
        
        <div className="bg-gradient-to-r from-roofing-beige to-roofing-cream px-4 py-3 rounded-md font-mono text-lg font-bold text-roofing-orange-dark border border-roofing-orange/20 shadow-sm">
          {isExitIntent ? "LASTCHANCE" : "ROOF2024"}
        </div>
        
        <div className="text-sm font-medium text-roofing-charcoal/80">
          Time Remaining:
        </div>
        
        <div className="font-mono text-2xl font-bold bg-gradient-to-r from-roofing-orange-dark to-roofing-orange bg-clip-text text-transparent">
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>

        <Button 
          onClick={onClick}
          className="w-full bg-gradient-to-r from-roofing-orange-dark to-roofing-orange hover:from-roofing-orange hover:to-roofing-orange-dark text-white font-semibold py-6 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 border border-roofing-orange/20"
        >
          Click Here to Save!
          <span className="animate-bounce">→</span>
        </Button>
      </div>
    </motion.div>
  );
};