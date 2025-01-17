import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePromoAnimation } from "./promo/usePromoAnimation";
import { usePromoVisibility } from "./promo/usePromoVisibility";
import { PromoContent } from "./promo/PromoContent";

const PromoCountdown = () => {
  const navigate = useNavigate();
  const { isVisible, isClosed, isExitIntent, timeLeft, setIsClosed } = usePromoVisibility();
  const { position, setIsHovered } = usePromoAnimation(isVisible, isClosed);

  if (isClosed || timeLeft === 0) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClosed(true);
    localStorage.setItem('promoClosedPermanently', 'true');
    console.log("Promo closed permanently by user");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            x: position.x,
            y: position.y,
            transition: {
              type: "spring",
              stiffness: 50,
              damping: 20
            }
          }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed z-50"
          style={{ 
            pointerEvents: isClosed ? 'none' : 'auto',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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