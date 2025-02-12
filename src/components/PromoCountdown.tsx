import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePromoAnimation } from "./promo/usePromoAnimation";
import { usePromoVisibility } from "./promo/usePromoVisibility";
import { PromoContent } from "./promo/PromoContent";

const PromoCountdown = () => {
  const navigate = useNavigate();
  const { isVisible, isClosed, isExitIntent, timeLeft, setIsClosed } = usePromoVisibility();
  const { position, setIsHovered } = usePromoAnimation(isVisible, isClosed);

  if (isClosed) {
    return null;
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClosed(true);
    localStorage.setItem('promoClosedPermanently', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            x: position.x,
            y: position.y,
            transition: {
              opacity: { duration: 0.4, ease: "easeOut" },
              scale: { duration: 0.4, ease: "easeOut" },
              x: { type: "spring", stiffness: 50, damping: 15 }, // Smoother spring animation
              y: { type: "spring", stiffness: 50, damping: 15 }  // Smoother spring animation
            }
          }}
          exit={{ 
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.3, ease: "easeIn" }
          }}
          className="fixed z-[9999] transform-gpu" // Added transform-gpu for smoother animations
          style={{ 
            pointerEvents: isClosed ? 'none' : 'auto',
            willChange: 'transform', // Optimize for animations
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <PromoContent
            isExitIntent={isExitIntent}
            timeLeft={timeLeft}
            onClose={handleClose}
            onClick={() => navigate('/estimate')}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoCountdown;