import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TypingEffect } from "./TypingEffect";
import { useState, useEffect } from "react";

interface ChatMessageProps {
    message: Message;
    isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping }) => {
    const isAssistant = message.role === "assistant";
    const [shouldType, setShouldType] = useState(isAssistant);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        if (isAssistant) {
            setShouldType(true);
            setIsTypingComplete(false);
        }
    }, [message.content, isAssistant]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "flex gap-3 items-start group",
                isAssistant ? "flex-row" : "flex-row-reverse"
            )}
        >
            <motion.div 
                initial="rest"
                animate={shouldType && !isTypingComplete ? "hammer" : "rest"}
                variants={{
                    rest: { rotate: 0 },
                    hammer: { 
                        rotate: [-10, 20, -10],
                        transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }
                }}
                className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isAssistant ? 
                        "bg-gradient-to-br from-roofing-orange to-roofing-orange-dark shadow-lg shadow-roofing-orange/20" : 
                        "bg-gray-100"
                )}
            >
                {isAssistant ? (
                    <img 
                        src="/images/hammer-icon.svg"
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
            </motion.div>
            <div className={cn(
                "relative rounded-2xl px-4 py-3 max-w-[85%] transition-all duration-300",
                isAssistant ? 
                    "bg-white border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-100/60" : 
                    "bg-roofing-orange/10 text-gray-800 hover:bg-roofing-orange/15"
            )}>
                <div className={cn(
                    "absolute w-2 h-2 rotate-45 top-4",
                    isAssistant ? 
                        "-left-1 bg-white border-l border-t border-gray-100" : 
                        "-right-1 bg-roofing-orange/10"
                )}/>
                <div className="text-sm leading-relaxed">
                    {isAssistant && shouldType && !isTypingComplete ? (
                        <TypingEffect 
                            text={message.content} 
                            speed={30} 
                            onComplete={() => {
                                setIsTypingComplete(true);
                                setShouldType(false);
                            }}
                        />
                    ) : (
                        message.content
                    )}
                </div>
            </div>
        </motion.div>
    );
};