import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [storedTimeLeft, setStoredTimeLeft] = useLocalStorage('promoTimeLeft', '120'); // Set to 2 minutes (120 seconds)
  const [timeLeft, setTimeLeft] = useState(parseInt(storedTimeLeft));

  // Initialize visibility on mount - show immediately
  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    console.log("Initializing promo visibility - permanentlyClosed:", isPermanentlyClosed);
    
    // Reset localStorage on each visit to ensure the promo shows
    if (!isPermanentlyClosed) {
      localStorage.removeItem('promoTimeLeft');
      setTimeLeft(120); // Reset to 2 minutes
      setIsClosed(false);
      setIsVisible(true);
    }
  }, []);

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
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          localStorage.setItem('promoClosedPermanently', 'true');
          setIsClosed(true);
          console.log("Timer reached zero, closing permanently");
          return 0;
        }
        setStoredTimeLeft(newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClosed, setStoredTimeLeft]);

  // Force visibility on route changes
  useEffect(() => {
    if (!isClosed && timeLeft > 0) {
      setIsVisible(true);
      console.log("Showing promo on route change");
    }
  }, [location.pathname]);

  return {
    isVisible,
    isClosed,
    isExitIntent,
    timeLeft,
    setIsClosed,
  };
};