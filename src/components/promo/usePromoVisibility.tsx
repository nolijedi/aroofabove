import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const usePromoVisibility = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [storedTimeLeft, setStoredTimeLeft] = useLocalStorage('promoTimeLeft', '60');
  const [timeLeft, setTimeLeft] = useState(parseInt(storedTimeLeft));

  // Check if promo should be permanently closed
  useEffect(() => {
    const isPermanentlyClosed = localStorage.getItem('promoClosedPermanently') === 'true';
    if (isPermanentlyClosed || timeLeft <= 0) {
      setIsClosed(true);
      return;
    }

    // Always show promo if not closed
    setIsClosed(false);
    setIsVisible(true);
    console.log("Promo visibility set to true, time left:", timeLeft);
  }, [timeLeft]);

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
    if (isClosed) return;

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

  return {
    isVisible,
    isClosed,
    isExitIntent,
    timeLeft,
    setIsClosed,
  };
};