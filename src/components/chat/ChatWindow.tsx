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
  const [showLogs, setShowLogs] = useState(false);
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  // Reset position when window is closed and reopened
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  // Calculate initial position (center of screen)
  const initialX = Math.max(0, (window.innerWidth - 350) / 2);
  const initialY = Math.max(0, (window.innerHeight - 450) / 2);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 z-[999]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1000] pointer-events-none" ref={constraintsRef}>
        <motion.div
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragConstraints={constraintsRef}
          dragElastic={0}
          initial={{ opacity: 0, scale: 0.95, x: initialX, y: initialY }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: position.x + initialX,
            y: position.y + initialY,
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onDragEnd={(_, info) => {
            setPosition(prev => ({
              x: prev.x + info.offset.x,
              y: prev.y + info.offset.y
            }));
          }}
          onClick={(e) => e.stopPropagation()}
          className={`
            absolute
            w-[350px] h-[450px]
            bg-white rounded-xl
            shadow-2xl
            flex flex-col
            overflow-hidden
            border border-gray-100
            pointer-events-auto
          `}
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