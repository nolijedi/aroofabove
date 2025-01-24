import Draggable from "react-draggable";
import { useMediaQuery } from "@/hooks/use-mobile";

interface DraggableContainerProps {
  children: React.ReactNode;
  onDrag?: (e: any, data: any) => void;
  onStop?: (e: any, data: any) => void;
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
        <div className="fixed z-40 group">
          {children}
        </div>
      </Draggable>
    );
  }

  // Mobile-specific dragging configuration
  return (
    <Draggable
      handle=".chat-header"
      bounds={{
        top: 20,
        bottom: window.innerHeight - 200
      }}
      axis="y"
      defaultPosition={{
        x: 0,
        y: window.innerHeight - 400
      }}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div className="fixed z-40 left-0 right-0">
        {children}
      </div>
    </Draggable>
  );
};