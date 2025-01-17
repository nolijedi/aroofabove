import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [storedTimeLeft, setStoredTimeLeft] = useLocalStorage('promoTimeLeft', '60');
  const [timeLeft, setTimeLeft] = useState(parseInt(storedTimeLeft));

  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    if (isPermanentlyClosed || timeLeft <= 0) {
      setIsClosed(true);
      return;
    }

    setIsClosed(false);
    setIsVisible(true);
  }, [location.pathname, timeLeft]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isClosed && timeLeft > 0) {
        setIsExitIntent(true);
        setIsVisible(true);
        console.log("Exit intent detected, showing promo");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    const showTimeout = setTimeout(() => {
      if (!isClosed && timeLeft > 0) {
        setIsVisible(true);
        console.log("Initial promo display after 3 seconds");
      }
    }, 3000);

    return () => {
      clearTimeout(showTimeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClosed, timeLeft]);

  useEffect(() => {
    if (!isVisible || isClosed) return;

    console.log("Countdown continuing from", timeLeft, "seconds");
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          localStorage.setItem('promoClosedPermanently', 'true');
          console.log("Timer reached zero, closing permanently");
          return 0;
        }
        setStoredTimeLeft(newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, isClosed, setStoredTimeLeft]);

  return {
    isVisible,
    isClosed,
    isExitIntent,
    timeLeft,
    setIsClosed,
  };
};