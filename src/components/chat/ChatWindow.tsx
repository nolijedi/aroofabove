import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { LoadingSpinner } from "./LoadingSpinner";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatWindowProps {
  onClose: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  iframeUrl: string;
}

export const ChatWindow = ({
  onClose,
  isLoading,
  isAuthenticated,
  iframeUrl,
}: ChatWindowProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
      className={`fixed bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-30 ${
        isMobile 
          ? 'bottom-20 left-4 right-4 max-w-[400px] mx-auto' 
          : 'bottom-24 right-8 w-[380px]'
      }`}
      style={{
        height: isMobile ? "calc(100vh - 180px)" : "600px",
        maxHeight: isMobile ? "600px" : "calc(100vh - 180px)",
      }}
    >
      <ChatHeader onClose={onClose} />
      <div className="h-[calc(100%-48px)] w-full overflow-hidden bg-white">
        {isLoading ? (
          <LoadingSpinner />
        ) : isAuthenticated ? (
          <iframe
            src={iframeUrl}
            className="w-full h-full"
            style={{ 
              minHeight: "100%",
              height: "100%"
            }}
            frameBorder="0"
            title="Chat Interface"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Failed to load chat interface
          </div>
        )}
      </div>
    </motion.div>
  );
};