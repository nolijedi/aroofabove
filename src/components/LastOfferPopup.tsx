import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface LastOfferPopupProps {
  onClose: () => void;
}

export const LastOfferPopup: React.FC<LastOfferPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const popupVariants = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    hover: { y: 0 },
    floating: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    },
    exit: { scale: 0.9, opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <motion.div
            variants={popupVariants}
            initial="initial"
            animate="floating"
            whileHover="hover"
            exit="exit"
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              className="absolute -top-4 -right-4 bg-roofing-orange text-white p-2 rounded-full hover:bg-roofing-orange-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <X size={20} />
            </motion.button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🏠 Limited Time Offer!
              </h2>
              <p className="text-gray-600 mb-6">
                Get a <span className="text-roofing-orange font-semibold">FREE roof inspection</span> and save up to 25% on your next roofing project!
              </p>
              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-roofing-orange hover:bg-roofing-orange-dark text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/estimate">Get Free Estimate Now</Link>
                </Button>
                <button
                  onClick={handleClose}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LastOfferPopup;
