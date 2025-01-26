import { motion, useDragControls } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { Link } from "react-router-dom";
import { X, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatLogs } from "./ChatLogs";

interface ChatWindowProps {
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const ChatWindow = ({
  onClose,
  messages,
  onSendMessage,
  isTyping,
}: ChatWindowProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  // Reset position when window is closed and reopened
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  // Update constraints on window resize
  useEffect(() => {
    const handleResize = () => {
      if (constraintsRef.current) {
        const bounds = constraintsRef.current.getBoundingClientRect();
        const maxX = bounds.width - 300 - 20;  
        const maxY = bounds.height - 400 - 20;
        
        setPosition(prev => ({
          x: Math.min(Math.max(0, prev.x), maxX),
          y: Math.min(Math.max(80, prev.y), maxY)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate initial position based on screen size
  const isMobile = window.innerWidth <= 768;
  const navbarHeight = 80; 
  
  // Smaller window dimensions
  const windowWidth = 300;  
  const windowHeight = 400; 
  
  const initialX = isMobile
    ? Math.max(0, (window.innerWidth - windowWidth) / 2)
    : Math.max(0, window.innerWidth - windowWidth - 20);
    
  const initialY = Math.max(navbarHeight + 20, 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 z-[98]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[99] pointer-events-none" ref={constraintsRef}>
        <motion.div
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragConstraints={constraintsRef}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            const bounds = constraintsRef.current?.getBoundingClientRect();
            if (bounds) {
              const maxX = bounds.width - windowWidth - 20;
              const maxY = bounds.height - windowHeight - 20;
              const newX = Math.min(Math.max(0, position.x + info.offset.x), maxX);
              const newY = Math.min(Math.max(navbarHeight, position.y + info.offset.y), maxY);
              setPosition({ x: newX, y: newY });
            }
          }}
          style={{
            position: "absolute",
            left: position.x || initialX,
            top: position.y || initialY,
            width: windowWidth,
            height: windowHeight,
            touchAction: "none"
          }}
          className={`
            bg-white rounded-lg shadow-lg overflow-hidden pointer-events-auto flex flex-col
            ${isDragging ? 'cursor-grabbing' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="
              flex items-center justify-between 
              px-4 py-2.5
              bg-gradient-to-r from-roofing-orange to-roofing-orange-dark
              cursor-move
              select-none
            "
            onPointerDown={(e) => dragControls.start(e)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white" />
              <h3 className="text-white font-medium text-sm">Chat with Eve</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white"
                onClick={() => setShowLogs(true)}
              >
                <FileText className="h-4 w-4" />
              </Button>
              <button
                onClick={onClose}
                className="
                  p-1 rounded-lg
                  hover:bg-white/10
                  transition-colors
                  text-white
                "
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Estimate Button */}
          <Link
            to="/estimate"
            className="
              w-full px-4 py-2
              bg-gradient-to-r from-roofing-orange/90 to-roofing-orange-dark/90
              text-white text-center font-medium text-sm
              hover:from-roofing-orange hover:to-roofing-orange-dark
              transition-all duration-300
              border-b border-roofing-orange/20
              flex items-center justify-center gap-2
              select-none
            "
          >
            <span>Get Instant Estimate</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>

          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatMessages messages={messages} isTyping={isTyping} />
            <ChatInput onSendMessage={onSendMessage} isTyping={isTyping} />
          </div>
        </motion.div>
      </div>

      <ChatLogs isOpen={showLogs} onClose={() => setShowLogs(false)} />
    </>
  );
};