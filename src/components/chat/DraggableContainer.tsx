import { ReactNode } from "react";
import Draggable from "react-draggable";
import { useMediaQuery } from "@/hooks/use-mobile";

interface DraggableContainerProps {
  children: ReactNode;
  onDrag: () => void;
  onStop: () => void;
}

export const DraggableContainer = ({ children, onDrag, onStop }: DraggableContainerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!isMobile) {
    return (
      <Draggable
        handle=".chat-header"
        bounds="parent"
        defaultPosition={{ 
          x: Math.max(window.innerWidth / 2 - 160, 20), 
          y: Math.max(window.innerHeight / 2 - 200, 100)
        }}
        onDrag={onDrag}
        onStop={onStop}
      >
        <div className="fixed z-40 group" style={{ maxHeight: 'calc(100vh - 100px)', top: '80px' }}>
          {children}
        </div>
      </Draggable>
    );
  }

  // For mobile, we still want to enable dragging but with different constraints
  return (
    <Draggable
      handle=".chat-header"
      bounds="parent"
      axis="y"
      onDrag={onDrag}
      onStop={onStop}
    >
      <div className="fixed z-40 left-0 right-0">
        {children}
      </div>
    </Draggable>
  );
};