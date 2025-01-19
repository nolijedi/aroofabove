import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[480px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-roofing-cream/5 to-transparent">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} index={index} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};