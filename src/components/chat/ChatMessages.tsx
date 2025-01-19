import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
}

export const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="flex-grow p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isTyping && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-8 h-8 rounded-full bg-roofing-orange flex items-center justify-center">
            <img 
              src="/lovable-uploads/cfe74ea0-b3ce-4017-a778-51f7dd28f478.png" 
              alt="House Icon"
              className="w-5 h-5"
            />
          </div>
          <LoadingSpinner />
        </div>
      )}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};