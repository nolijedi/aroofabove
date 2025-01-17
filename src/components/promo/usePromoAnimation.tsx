import { useState, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

export const usePromoAnimation = (isVisible: boolean, isClosed: boolean) => {
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [velocity, setVelocity] = useState<Velocity>({ x: 2, y: 2 });
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number>();
  const promoWidth = 320; // Width of the promo component
  const promoHeight = 400; // Approximate height of the promo component

  useEffect(() => {
    const animate = () => {
      if (isHovered) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      setPosition(prevPos => {
        const newPos = {
          x: prevPos.x + velocity.x,
          y: prevPos.y + velocity.y
        };

        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        // Check horizontal boundaries
        if (newPos.x <= 0) {
          newPos.x = 0;
          newVelocityX = Math.abs(velocity.x);
        } else if (newPos.x >= window.innerWidth - promoWidth) {
          newPos.x = window.innerWidth - promoWidth;
          newVelocityX = -Math.abs(velocity.x);
        }

        // Check vertical boundaries
        if (newPos.y <= 0) {
          newPos.y = 0;
          newVelocityY = Math.abs(velocity.y);
        } else if (newPos.y >= window.innerHeight - promoHeight) {
          newPos.y = window.innerHeight - promoHeight;
          newVelocityY = -Math.abs(velocity.y);
        }

        // Update velocity if it changed
        if (newVelocityX !== velocity.x || newVelocityY !== velocity.y) {
          setVelocity({ x: newVelocityX, y: newVelocityY });
        }

        return newPos;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    if (isVisible && !isClosed) {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, isClosed, velocity, isHovered]);

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      setPosition(prevPos => ({
        x: Math.min(prevPos.x, window.innerWidth - promoWidth),
        y: Math.min(prevPos.y, window.innerHeight - promoHeight)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { 
    position,
    setIsHovered
  };
};