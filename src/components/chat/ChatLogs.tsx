import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ChatLogsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatLogs = ({ isOpen, onClose }: ChatLogsProps) => {
  const [logs, setLogs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('chat_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedLogs = data.map((log: any) => ({
        id: log.id,
        role: log.role,
        content: log.message_content,
        createdAt: new Date(log.created_at),
      }));

      setLogs(formattedLogs);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Chat Logs</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 border-b">
          <Button onClick={fetchLogs} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Logs'}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {error && (
            <div className="text-red-500 mb-4">
              Error: {error}
            </div>
          )}
          
          {logs.map((log) => (
            <div
              key={log.id}
              className={`mb-4 p-3 rounded-lg ${
                log.role === 'user'
                  ? 'bg-blue-50 ml-auto'
                  : 'bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {log.role === 'user' ? 'User' : 'Assistant'}
              </div>
              <div className="text-gray-700">{log.content}</div>
              <div className="text-xs text-gray-500 mt-1">
                {log.createdAt.toLocaleString()}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </motion.div>
  );
};