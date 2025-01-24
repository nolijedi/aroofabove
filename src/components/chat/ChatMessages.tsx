import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { AnimatePresence, motion } from "framer-motion";

interface ChatMessagesProps {
    messages: Message[];
    isTyping: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <ChatMessage message={message} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};