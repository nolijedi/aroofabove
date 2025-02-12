import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export const usePromoAnimation = (isVisible: boolean, isClosed: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [velocity, setVelocity] = useState<Position>({ x: 0.1, y: 0.08 }); // Even slower initial velocity
  const [lastMousePosition, setLastMousePosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!isVisible || isClosed) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) return;
      
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, isClosed, isHovered]);

  useEffect(() => {
    if (!isVisible || isClosed || isHovered) return;

    const animationFrame = requestAnimationFrame(function animate() {
      setPosition(prevPos => {
        const newX = prevPos.x + velocity.x;
        const newY = prevPos.y + velocity.y;
        
        // Get viewport dimensions, accounting for promo size
        const maxX = window.innerWidth - 340;
        const maxY = window.innerHeight - 340;
        
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        // Gentle bounce off walls with easing
        if (newX > maxX || newX < 20) {
          newVelocityX = -velocity.x * 0.8; // Reduce bounce intensity
        }
        
        if (newY > maxY || newY < 20) {
          newVelocityY = -velocity.y * 0.8; // Reduce bounce intensity
        }

        // If mouse position is available, add very subtle attraction/repulsion
        if (lastMousePosition) {
          const dx = lastMousePosition.x - newX;
          const dy = lastMousePosition.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 400) { // Only react when mouse is nearby
            // Gently move away from mouse
            newVelocityX -= (dx / distance) * 0.01;
            newVelocityY -= (dy / distance) * 0.01;
          }
        }

        // Apply very subtle random movement with damping
        setVelocity({
          x: newVelocityX * 0.995 + (Math.random() - 0.5) * 0.0005,
          y: newVelocityY * 0.995 + (Math.random() - 0.5) * 0.0005
        });

        return {
          x: Math.max(20, Math.min(maxX, newX)),
          y: Math.max(20, Math.min(maxY, newY))
        };
      });

      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, isClosed, isHovered, velocity, lastMousePosition]);

  return { 
    position,
    setIsHovered
  };
};