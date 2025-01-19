import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="chat-header bg-roofing-orange/90 p-4 flex justify-between items-center cursor-move">
      <div className="flex items-center space-x-2">
        <span className="text-white font-semibold">Chat with us</span>
        <span className="text-xs text-white/80">(Drag to move)</span>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-white/80 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};