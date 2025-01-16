import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePromoAnimation } from "./promo/usePromoAnimation";
import { usePromoVisibility } from "./promo/usePromoVisibility";
import { PromoContent } from "./promo/PromoContent";

const PromoCountdown = () => {
  const navigate = useNavigate();
  const { isVisible, isClosed, isExitIntent, timeLeft, setIsClosed } = usePromoVisibility();
  const { position } = usePromoAnimation(isVisible, isClosed);

  if (isClosed || timeLeft === 0) return null;

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