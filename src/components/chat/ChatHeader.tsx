import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="chat-header bg-gradient-to-r from-roofing-orange/90 to-roofing-orange-dark/90 p-2 flex justify-between items-center cursor-move">
      <div className="flex items-center space-x-2">
        <span className="text-white text-sm font-medium">Chat with us</span>
        <span className="text-[10px] text-white/80">(Drag to move)</span>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-white/80 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};