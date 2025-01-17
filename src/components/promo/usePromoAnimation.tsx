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

  // Define the boundaries as percentage of viewport
  const maxRightBoundary = 0.7; // 70% of viewport width
  const maxBottomBoundary = 0.7; // 70% of viewport height
  const minLeftBoundary = 0.1; // 10% of viewport width
  const minTopBoundary = 0.1; // 10% of viewport height

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

        // Calculate boundaries based on viewport percentages
        const rightBoundary = window.innerWidth * maxRightBoundary - promoWidth;
        const bottomBoundary = window.innerHeight * maxBottomBoundary - promoHeight;
        const leftBoundary = window.innerWidth * minLeftBoundary;
        const topBoundary = window.innerHeight * minTopBoundary;

        // Check horizontal boundaries
        if (newPos.x <= leftBoundary) {
          newPos.x = leftBoundary;
          newVelocityX = Math.abs(velocity.x);
        } else if (newPos.x >= rightBoundary) {
          newPos.x = rightBoundary;
          newVelocityX = -Math.abs(velocity.x);
        }

        // Check vertical boundaries
        if (newPos.y <= topBoundary) {
          newPos.y = topBoundary;
          newVelocityY = Math.abs(velocity.y);
        } else if (newPos.y >= bottomBoundary) {
          newPos.y = bottomBoundary;
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
      const rightBoundary = window.innerWidth * maxRightBoundary - promoWidth;
      const bottomBoundary = window.innerHeight * maxBottomBoundary - promoHeight;
      const leftBoundary = window.innerWidth * minLeftBoundary;
      const topBoundary = window.innerHeight * minTopBoundary;

      setPosition(prevPos => ({
        x: Math.max(leftBoundary, Math.min(prevPos.x, rightBoundary)),
        y: Math.max(topBoundary, Math.min(prevPos.y, bottomBoundary))
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