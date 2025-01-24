import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ChatMessagesProps {
    messages: Message[];
    isTyping: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
            <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                    <motion.div
                        key={message.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <ChatMessage 
                            message={message} 
                            isTyping={index === messages.length - 1 && isTyping && message.role === "assistant"}
                        />
                    </motion.div>
                ))}
                {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2 px-4 py-2"
                    >
                        <motion.div 
                            className="w-6 h-6 rounded-lg bg-gradient-to-br from-roofing-orange to-roofing-orange-dark flex items-center justify-center shadow-lg shadow-roofing-orange/20"
                            animate={{ rotate: [-10, 20, -10] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <img 
                                src="/images/hammer-icon.svg"
                                alt="Assistant"
                                className="w-4 h-4"
                            />
                        </motion.div>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-roofing-orange/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-roofing-orange/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-roofing-orange/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};