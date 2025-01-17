import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false); // Start as hidden
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Start at 120 seconds

  // Initialize visibility with delay on mount and route changes
  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    console.log("Initializing promo visibility - permanentlyClosed:", isPermanentlyClosed);
    
    if (!isPermanentlyClosed) {
      // Set a 1-second delay before showing the promo
      const timer = setTimeout(() => {
        setTimeLeft(120);
        setIsClosed(false);
        setIsVisible(true);
        console.log("Showing promo after 1-second delay");
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsClosed(true);
    }
  }, [location.pathname]); // Re-run on route changes

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

  // Handle countdown timer
  useEffect(() => {
    if (isClosed) {
      console.log("Timer stopped - promo is closed");
      return;
    }

    console.log("Starting countdown from", timeLeft, "seconds");
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setIsClosed(true);
          localStorage.setItem('promoClosedPermanently', 'true');
          console.log("Timer reached zero, closing permanently");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClosed]);

  return {
    isVisible,
    isClosed,
    isExitIntent,
    timeLeft,
    setIsClosed,
  };
};