import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({ inputValue, setInputValue, handleSend, handleKeyPress }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t border-gray-200/30 p-4 bg-white/30 backdrop-blur-sm flex gap-3">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-roofing-orange/30 focus:border-transparent bg-white/30"
      />
      <Button
        onClick={handleSend}
        className="bg-gradient-to-r from-roofing-orange/50 to-roofing-orange-dark/50 hover:from-roofing-orange-dark/60 hover:to-roofing-orange-dark/70 rounded-full h-10 w-10 p-0 flex items-center justify-center"
      >
        <Send className="w-5 h-5 text-white/90" />
      </Button>
    </div>
  );
};