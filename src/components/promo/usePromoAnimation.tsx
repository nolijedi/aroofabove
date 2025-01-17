import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export const usePromoAnimation = (isVisible: boolean, isClosed: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [velocity, setVelocity] = useState<Position>({ x: 0.5, y: 0.3 }); // Slower initial velocity

  useEffect(() => {
    if (!isVisible || isClosed || isHovered) return;

    const animationFrame = requestAnimationFrame(function animate() {
      setPosition(prevPos => {
        const newX = prevPos.x + velocity.x;
        const newY = prevPos.y + velocity.y;
        
        // Get viewport dimensions, subtracting space for the promo
        const maxX = window.innerWidth - 340;
        const maxY = window.innerHeight - 340;
        
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        // Gentle bounce off walls
        if (newX > maxX || newX < 20) {
          newVelocityX = -velocity.x;
        }
        
        if (newY > maxY || newY < 20) {
          newVelocityY = -velocity.y;
        }

        // Very subtle random movement
        setVelocity({
          x: newVelocityX * 0.9999 + (Math.random() - 0.5) * 0.01,
          y: newVelocityY * 0.9999 + (Math.random() - 0.5) * 0.01
        });

        return {
          x: Math.max(20, Math.min(maxX, newX)),
          y: Math.max(20, Math.min(maxY, newY))
        };
      });

      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, isClosed, isHovered, velocity]);

  return { 
    position,
    setIsHovered
  };
};