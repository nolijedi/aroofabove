import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('promoTimeLeft');
    return savedTime ? parseInt(savedTime, 10) : 120;
  });

  // Initialize visibility on mount and route changes
  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    console.log("Initializing promo visibility - permanentlyClosed:", isPermanentlyClosed);
    
    if (!isPermanentlyClosed) {
      // Show after 1 second delay, but don't reset timer
      const showTimer = setTimeout(() => {
        setIsClosed(false);
        setIsVisible(true);
        console.log("Showing promo after 1-second delay");
      }, 1000);

      return () => clearTimeout(showTimer);
    } else {
      setIsClosed(true);
    }
  }, [location.pathname]);

  // Handle exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isClosed && timeLeft > 0) {
        setIsExitIntent(true);
        setIsVisible(true);
        console.log("Exit intent detected");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isClosed, timeLeft]);

  // Handle countdown timer - starts immediately when visible
  useEffect(() => {
    if (isClosed || !isVisible) {
      console.log("Timer stopped - promo is closed or not visible");
      return;
    }

    console.log("Starting countdown from", timeLeft, "seconds");
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime <= 0 ? 0 : prevTime - 1;
        localStorage.setItem('promoTimeLeft', newTime.toString());
        
        if (newTime <= 0) {
          clearInterval(timer);
          setIsClosed(true);
          localStorage.setItem('promoClosedPermanently', 'true');
          console.log("Timer reached zero, closing permanently");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClosed, isVisible]);

  return {
    isVisible,
    isClosed,
    isExitIntent,
    timeLeft,
    setIsClosed,
  };
};