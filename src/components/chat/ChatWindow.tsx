import React, { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessages } from "./ChatMessages";
import { Message } from "@/types/chat";

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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            try {
                await onSendMessage(inputValue);
                setInputValue("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            drag
            dragControls={dragControls}
            className={`fixed w-[300px] h-[400px] bottom-[80px] right-[80px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 z-[100] ${isMinimized ? 'hidden' : ''}`}
            onPointerDown={(e) => dragControls.start(e)}
        >
            <div className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark p-3 flex justify-between items-center rounded-t-lg">
                <div>
                    <h3 className="text-white font-semibold">Chat with Us</h3>
                    <p className="text-white text-xs opacity-80">We typically reply within minutes</p>
                </div>
                <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                    <X size={20} />
                </button>
            </div>

            <ChatMessages messages={messages} isTyping={isTyping} />

            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-roofing-orange focus:border-transparent"
                        rows={2}
                    />
                    <Button 
                        type="submit" 
                        className="bg-roofing-orange hover:bg-roofing-orange-dark text-white"
                        disabled={!inputValue.trim()}
                    >
                        Send
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};