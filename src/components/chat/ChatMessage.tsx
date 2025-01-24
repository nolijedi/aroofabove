import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { TypingEffect } from "./TypingEffect";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-2 items-start",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isAssistant ? "bg-gradient-to-br from-roofing-orange to-roofing-orange-dark" : "bg-gray-100"
      )}>
        {isAssistant ? (
          <img 
            src="/lovable-uploads/cfe74ea0-b3ce-4017-a778-51f7dd28f478.png" 
            alt="Assistant"
            className="w-5 h-5"
          />
        ) : (
          <div className="w-4 h-4 text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 10-16 0" />
            </svg>
          </div>
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "rounded-xl px-4 py-2 max-w-[85%] shadow-sm",
          isAssistant 
            ? "bg-white border border-gray-100" 
            : "bg-roofing-orange/10 text-gray-800"
        )}
      >
        <p className="text-sm">
          {isAssistant ? (
            <TypingEffect text={message.content} />
          ) : (
            message.content
          )}
        </p>
      </div>
    </div>
  );
};