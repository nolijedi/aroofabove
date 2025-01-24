import React, { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessages } from "./ChatMessages";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ChatWindowProps {
    isMinimized?: boolean;
    onClose: () => void;
    messages: Message[];
    onSendMessage: (message: string) => Promise<void>;
    isTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    isMinimized = false,
    onClose,
    messages,
    onSendMessage,
    isTyping,
}) => {
    const [inputValue, setInputValue] = useState("");
    const dragControls = useDragControls();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isSending, setIsSending] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isTyping || messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && !isSending) {
            setIsSending(true);
            try {
                await onSendMessage(inputValue);
                setInputValue("");
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                setIsSending(false);
            }
        }
    };

    const handleDragStart = (e: React.PointerEvent) => {
        e.stopPropagation();
        dragControls.start(e);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            drag
            dragControls={dragControls}
            className={cn(
                "fixed w-[300px] h-[400px] bottom-[80px] right-[80px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col border border-gray-200/50 z-[100]",
                isMinimized ? 'hidden' : '',
                "overflow-hidden"
            )}
        >
            <div 
                className="flex items-center justify-between px-4 py-3 bg-roofing-orange"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-white mask-beaker" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white leading-tight">Chat with Eve</h2>
                        <p className="text-white/80 text-xs">Your Roofing Expert</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <motion.div 
                        className="bg-gradient-to-r from-roofing-orange-dark to-roofing-orange p-2 border-b"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                asChild
                                className="w-full bg-white text-roofing-orange hover:bg-white/90 font-semibold shadow-lg"
                            >
                                <Link to="/estimate">Get Instant Estimate</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                    <button 
                        onClick={onClose}
                        className="text-white/90 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden bg-chat-pattern">
                <div 
                    className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300" 
                    onClick={e => e.stopPropagation()}
                >
                    <ChatMessages messages={messages} isTyping={isTyping} />
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder="Type your message..."
                            className="w-full p-2 pr-10 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-roofing-orange focus:border-transparent bg-white/90 backdrop-blur-sm text-sm"
                            rows={2}
                            disabled={isSending}
                            onClick={e => e.stopPropagation()}
                        />
                        <Button 
                            type="submit" 
                            size="icon"
                            className={cn(
                                "absolute right-2 bottom-2 h-6 w-6 bg-roofing-orange hover:bg-roofing-orange-dark text-white rounded-lg transition-all duration-200",
                                !inputValue.trim() && "opacity-50 cursor-not-allowed",
                                "shadow-lg shadow-roofing-orange/20 hover:shadow-xl hover:shadow-roofing-orange/30"
                            )}
                            disabled={!inputValue.trim() || isSending}
                            onClick={e => e.stopPropagation()}
                        >
                            {isSending ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Send size={14} />
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};