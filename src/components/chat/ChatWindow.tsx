import { useRef } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Message } from "@/types/chat";
import { ChatLoadingIndicator } from "./ChatLoadingIndicator";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleEstimateClick = () => {
    onClose();
    navigate("/estimate");
  };

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className={`
          fixed bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col
          w-[250px] h-[320px]
          bottom-[80px] right-[80px]
          border border-gray-200
          pointer-events-auto
          transform-gpu
        `}
        style={{
          zIndex: 9999,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Header - Draggable Area */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark p-4 text-white flex justify-between items-center cursor-move"
        >
          <div>
            <h3 className="font-semibold">Chat with Us</h3>
            <p className="text-xs opacity-90">We typically reply within minutes</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Estimate Button */}
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <Button
            variant="default"
            className="w-full bg-roofing-orange hover:bg-roofing-orange-dark text-white font-medium"
            onClick={handleEstimateClick}
          >
            Get Instant Estimate Now
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <ChatMessages 
            messages={messages} 
            isTyping={isTyping}
            loadingIndicator={<ChatLoadingIndicator />}
          />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <ChatInput 
            onSendMessage={onSendMessage}
            isTyping={isTyping}
          />
        </div>
      </motion.div>
    </div>
  );
};