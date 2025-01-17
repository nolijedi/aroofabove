import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Start at 120 seconds

  // Initialize visibility on mount
  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    console.log("Initializing promo visibility - permanentlyClosed:", isPermanentlyClosed);
    
    if (!isPermanentlyClosed) {
      setTimeLeft(120);
      setIsClosed(false);
      setIsVisible(true);
    } else {
      setIsClosed(true);
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