import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const PromoCountdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const frameRef = useRef<number>();

  // Reset isClosed state when route changes
  useEffect(() => {
    setIsClosed(false);
    setIsVisible(true); // Always show on route change
    setTimeLeft(60); // Reset timer
  }, [location.pathname]);

  // Handle exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsExitIntent(true);
        setIsVisible(true); // Show when exit intent detected
        setTimeLeft(60); // Reset timer
        console.log("Exit intent detected, showing promo");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial show after 3 seconds
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      setTimeLeft(60);
      console.log("Initial promo display after 3 seconds");
    }, 3000);

    return () => {
      clearTimeout(showTimeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animation loop for floating effect
  useEffect(() => {
    const animate = () => {
      setPosition(prevPos => {
        const newPos = {
          x: prevPos.x + velocity.x,
          y: prevPos.y + velocity.y
        };

        // Check for collision with window boundaries
        if (newPos.x <= 0 || newPos.x >= window.innerWidth - 300) {
          setVelocity(prev => ({ ...prev, x: -prev.x }));
        }
        if (newPos.y <= 0 || newPos.y >= window.innerHeight - 400) {
          setVelocity(prev => ({ ...prev, y: -prev.y }));
        }

        // Keep within bounds
        return {
          x: Math.max(0, Math.min(window.innerWidth - 300, newPos.x)),
          y: Math.max(0, Math.min(window.innerHeight - 400, newPos.y))
        };
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    if (isVisible && !isClosed) {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, isClosed, velocity]);

  // Countdown timer
  useEffect(() => {
    if (!isVisible || isClosed) return;

    console.log("Starting countdown from", timeLeft, "seconds");
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          console.log("Timer reached zero");
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, isClosed]);

  if (isClosed || timeLeft === 0) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClosed(true);
    console.log("Promo closed by user");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            x: position.x,
            y: position.y
          }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed z-50"
          style={{ 
            pointerEvents: isClosed ? 'none' : 'auto',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative p-6 rounded-lg shadow-2xl bg-gradient-to-br from-[#8B5CF6]/80 to-[#D946EF]/80 backdrop-blur-md border border-white/10 cursor-pointer"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoCountdown;