import Draggable from "react-draggable";
import { useMediaQuery } from "@/hooks/use-mobile";

interface DraggableContainerProps {
  children: React.ReactNode;
  onDrag?: (e: any, data: any) => void;
  onStop?: (e: any, data: any) => void;
}

export const DraggableContainer = ({ children, onDrag, onStop }: DraggableContainerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Draggable
      handle=".chat-header"
      bounds="body"
      defaultPosition={{ x: 0, y: 0 }}
      onDrag={onDrag}
      onStop={onStop}
      {...(isMobile ? {
        axis: "both",
        positionOffset: { x: "0", y: "0" }
      } : {})}
    >
      <div className={`fixed z-40 ${isMobile ? 'w-full' : ''}`}>
        {children}
      </div>
    </Draggable>
  );
};