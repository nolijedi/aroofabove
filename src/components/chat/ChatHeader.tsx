import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-roofing-orange/30 to-roofing-orange-dark/30 p-4 flex justify-between items-center backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5 text-white animate-bounce" />
        <h3 className="text-lg font-semibold text-white">Roofing Assistant</h3>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white hover:bg-white/20 rounded-full h-8 w-8"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};