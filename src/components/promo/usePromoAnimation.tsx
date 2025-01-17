import { useState } from "react";

interface Position {
  x: number;
  y: number;
}

export const usePromoAnimation = (isVisible: boolean, isClosed: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  // Fixed position in the bottom right corner with some padding
  const position: Position = {
    x: 20, // 20px from the right
    y: 20  // 20px from the bottom
  };

  return { 
    position,
    setIsHovered
  };
};