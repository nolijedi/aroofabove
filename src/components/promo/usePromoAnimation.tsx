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
  const [velocity, setVelocity] = useState<Velocity>({ x: 2, y: 2 });
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setPosition(prevPos => {
        const newPos = {
          x: prevPos.x + velocity.x,
          y: prevPos.y + velocity.y
        };

        if (newPos.x <= 0 || newPos.x >= window.innerWidth - 300) {
          setVelocity(prev => ({ ...prev, x: -prev.x }));
        }
        if (newPos.y <= 0 || newPos.y >= window.innerHeight - 400) {
          setVelocity(prev => ({ ...prev, y: -prev.y }));
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
  }, [isVisible, isClosed, velocity]);

  return { position };
};