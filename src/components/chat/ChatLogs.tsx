import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Lock, Search, Calendar, Globe, X } from 'lucide-react';
import { format } from 'date-fns';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface ChatLog {
  id: string;
  session_id: string;
  ip_address: string;
  user_agent: string;
  message_content: string;
  role: 'user' | 'assistant';
  created_at: string;
  metadata: any;
}

interface ChatLogsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatLogs({ isOpen, onClose }: ChatLogsProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPassword('');
      setSearchTerm('');
      setError(null);
    }
  }, [isOpen]);

  const authenticate = () => {
    if (password === 'jc321') {
      setIsAuthenticated(true);
      fetchLogs();
    } else {
      setError('Invalid password');
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      console.log('Fetching logs with password...');
      if (password !== 'jc321') {
        setError('Invalid password');
        return;
      }

      // Use direct table access with headers
      const { data, error } = await supabase
        .from('chat_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
        .headers({
          'x-chat-logs-key': password
        });

      console.log('Fetched data:', data);
      console.log('Error if any:', error);

      if (error) {
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        setError(`Failed to fetch logs: ${error.message}`);
        return;
      }
      
      if (!data || data.length === 0) {
        console.log('No logs found in the database');
      }

      setLogs(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to fetch logs: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const searchLower = searchTerm.toLowerCase();
    return (
      log.message_content.toLowerCase().includes(searchLower) ||
      log.ip_address.includes(searchTerm) ||
      log.session_id.includes(searchTerm) ||
      format(new Date(log.created_at), 'PPpp').toLowerCase().includes(searchLower)
    );
  });

  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const sessionId = log.session_id;
    if (!groups[sessionId]) {
      groups[sessionId] = [];
    }
    groups[sessionId].push(log);
    return groups;
  }, {} as Record<string, ChatLog[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 z-[1999]" />
        {!isAuthenticated ? (
          <DialogContent className="sm:max-w-[300px] p-0 overflow-hidden z-[2000] bg-white">
            <div className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark p-4 text-white">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5" />
                Admin Login
              </DialogTitle>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && authenticate()}
                  className="border-roofing-orange/20 focus:border-roofing-orange"
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                onClick={authenticate}
                className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark hover:from-roofing-orange/90 hover:to-roofing-orange-dark/90"
              >
                Login
              </Button>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col z-[2000] bg-white">
            <DialogHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5" />
                  Chat Logs
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  placeholder="Search by message content, IP address, session ID, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 px-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-roofing-orange"></div>
                </div>
              ) : Object.entries(groupedLogs).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FileText className="w-12 h-12 mb-2" />
                  <p className="text-lg font-medium">No logs found</p>
                  <p className="text-sm">
                    {searchTerm ? 'Try adjusting your search terms' : 'Start chatting to see logs here'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  {Object.entries(groupedLogs).map(([sessionId, sessionLogs]) => (
                    <div key={sessionId} className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(sessionLogs[0].created_at), 'PPpp')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {sessionLogs[0].ip_address}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {sessionLogs.map((log) => (
                          <div
                            key={log.id}
                            className={`flex gap-2 ${
                              log.role === 'assistant'
                                ? 'justify-start'
                                : 'justify-end'
                            }`}
                          >
                            <div
                              className={`rounded-lg p-3 max-w-[80%] ${
                                log.role === 'assistant'
                                  ? 'bg-gray-100'
                                  : 'bg-gradient-to-r from-roofing-orange/90 to-roofing-orange-dark/90 text-white'
                              }`}
                            >
                              <p className="whitespace-pre-wrap text-sm">{log.message_content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {format(new Date(log.created_at), 'pp')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
}
