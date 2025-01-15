import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useNavigate } from "react-router-dom";

const PromoCountdown = () => {
  const navigate = useNavigate();
  const [firstVisit, setFirstVisit] = useLocalStorage("first-visit", "");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add initial delay of 3 seconds before showing
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      console.log("Setting promo visible after 3 second delay");
    }, 3000);

    if (!firstVisit) {
      setFirstVisit(new Date().toISOString());
      console.log("First visit recorded");
    }

    const expiryTime = new Date(firstVisit).getTime() + (60 * 1000); // 60 seconds
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = expiryTime - now;
      
      if (distance < 0) {
        setIsExpired(true);
        setTimeLeft(0);
        console.log("Promo expired");
      } else {
        setTimeLeft(distance);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(showTimeout);
    };
  }, [firstVisit]);

  if (isExpired) return null;

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

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
            className="p-6 rounded-lg shadow-2xl bg-gradient-to-br from-roofing-charcoal/90 via-roofing-charcoal/95 to-roofing-orange-dark/90 backdrop-blur-md border border-white/10 cursor-pointer"
            onClick={() => navigate('/estimate')}
          >
            <div className="text-white space-y-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
                Limited Time Offer!
              </h3>
              <p className="text-sm text-gray-300">
                Get 15% off your roof estimate with code:
              </p>
              <div className="bg-white/10 px-4 py-2 rounded font-mono text-green-300">
                ROOF2024
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Expires in:
              </div>
              <div className="font-mono text-lg text-green-300">
                {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
              </div>
              <p className="text-xs text-gray-400 mt-2">
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