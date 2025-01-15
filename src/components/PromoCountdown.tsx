import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const PromoCountdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState<number>(60 * 1000); // 60 seconds
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Reset isClosed state when route changes
    setIsClosed(false);
  }, [location.pathname]);

  useEffect(() => {
    // Add initial delay of 3 seconds before showing
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      console.log("Setting promo visible after 3 second delay");
    }, 3000);

    // Start countdown from 60 seconds
    const startTime = Date.now();
    
    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = 60 * 1000 - elapsed; // 60 seconds in milliseconds
      
      if (remaining <= 0) {
        setTimeLeft(0);
        console.log("Promo expired");
      } else {
        setTimeLeft(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(showTimeout);
    };
  }, [location.pathname]); // Reset timer when route changes

  if (isClosed || timeLeft === 0) return null;

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClosed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative p-6 rounded-lg shadow-2xl bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] backdrop-blur-md border border-white/10 cursor-pointer"
            onClick={() => navigate('/estimate')}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close promotion"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="text-white space-y-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
                Limited Time Offer!
              </h3>
              <p className="text-sm">
                Get 15% off your roof estimate with code:
              </p>
              <div className="bg-white/10 px-4 py-2 rounded font-mono text-green-300">
                ROOF2024
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoCountdown;