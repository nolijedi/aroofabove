import Draggable from "react-draggable";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface DraggableContainerProps {
  children: React.ReactNode;
  onDrag?: (e: any, data: any) => void;
  onStop?: (e: any, data: any) => void;
}

export const DraggableContainer = ({ children, onDrag, onStop }: DraggableContainerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [bounds, setBounds] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const updateBounds = () => {
      const width = isMobile ? Math.min(window.innerWidth * 0.9, 350) : 300;
      const height = isMobile ? Math.min(window.innerHeight * 0.7, 500) : 450;
      
      setBounds({
        top: 60, // Keep below navbar
        left: -(window.innerWidth - width - 16), // Allow movement to left edge
        right: 0, // Allow movement to right edge
        bottom: window.innerHeight - height - 80 // Keep above bottom
      });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [isMobile]);

  return (
    <Draggable
      handle=".chat-header"
      bounds={bounds}
      defaultPosition={{ x: 0, y: 0 }}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div className="fixed z-40">
        {children}
      </div>
    </Draggable>
  );
};