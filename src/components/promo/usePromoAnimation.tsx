import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export const usePromoAnimation = (isVisible: boolean, isClosed: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [velocity, setVelocity] = useState<Position>({ x: 2, y: 1.5 });

  useEffect(() => {
    if (!isVisible || isClosed || isHovered) return;

    const animationFrame = requestAnimationFrame(function animate() {
      setPosition(prevPos => {
        const newX = prevPos.x + velocity.x;
        const newY = prevPos.y + velocity.y;
        
        // Get viewport dimensions, subtracting space for the promo (320px width, assume similar height)
        const maxX = window.innerWidth - 340;  // 320px + 20px padding
        const maxY = window.innerHeight - 340; // Similar height constraint
        
        // Calculate new velocity when hitting boundaries
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        // Bounce off right/left walls
        if (newX > maxX || newX < 20) {
          newVelocityX = -velocity.x;
        }
        
        // Bounce off top/bottom walls
        if (newY > maxY || newY < 20) {
          newVelocityY = -velocity.y;
        }

        // Update velocity with slight randomness for natural movement
        setVelocity({
          x: newVelocityX * 0.999 + (Math.random() - 0.5) * 0.1,
          y: newVelocityY * 0.999 + (Math.random() - 0.5) * 0.1
        });

        // Keep position within bounds
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
