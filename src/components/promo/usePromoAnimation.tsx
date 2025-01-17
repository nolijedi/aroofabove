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
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState<Velocity>({ x: 0.5, y: 0.5 }); // Reduced velocity
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number>();

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

        // Smooth bounce effect with gradual velocity changes
        if (newPos.x <= 0 || newPos.x >= window.innerWidth - 300) {
          newVelocityX = -velocity.x * 0.95; // Slightly reduce velocity on bounce
        }
        if (newPos.y <= 0 || newPos.y >= window.innerHeight - 400) {
          newVelocityY = -velocity.y * 0.95; // Slightly reduce velocity on bounce
        }

        if (newVelocityX !== velocity.x || newVelocityY !== velocity.y) {
          setVelocity({ x: newVelocityX, y: newVelocityY });
        }

        return {
          x: Math.max(0, Math.min(window.innerWidth - 300, newPos.x)),
          y: Math.max(0, Math.min(window.innerHeight - 400, newPos.y))
        };
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

  return { 
    position,
    setIsHovered
  };
};