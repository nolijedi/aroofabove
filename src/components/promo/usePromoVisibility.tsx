import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    if (isPermanentlyClosed) {
      setIsClosed(true);
      return;
    }

    setIsClosed(false);
    setIsVisible(true);
    setTimeLeft(60);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isClosed) {
        setIsExitIntent(true);
        setIsVisible(true);
        setTimeLeft(60);
        console.log("Exit intent detected, showing promo");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    const showTimeout = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true);
        setTimeLeft(60);
        console.log("Initial promo display after 3 seconds");
      }
    }, 3000);

    return () => {
      clearTimeout(showTimeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClosed]);

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

  return {
    isVisible,
    isClosed,
    isExitIntent,
    timeLeft,
    setIsClosed,
  };
};