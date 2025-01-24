// ChatInput.tsx
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isTyping: boolean;
}

export const ChatInput = ({ onSendMessage, isTyping }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    setMessage("");
    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="min-h-[40px] max-h-[120px] resize-none bg-gray-50 border-gray-200 focus:ring-roofing-orange focus:border-roofing-orange"
        disabled={isTyping}
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || isTyping}
        className={`
          flex-shrink-0 h-10 w-10
          bg-roofing-orange hover:bg-roofing-orange-dark 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        `}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
