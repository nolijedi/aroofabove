import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { LogOut, Search, Download, MessageSquare, Calculator, FileText, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import toast from '@/lib/toast';

type Application = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  resume_text: string | null;
  created_at: string;
  status: string;
};

type ChatLog = {
  id: string;
  email: string;
  message: string;
  user_type: 'assistant' | 'user';
  ip_address?: string;
  created_at: string;
  name?: string;
  phone?: string;
  address?: string;
  conversation_id: string;
  extracted_info?: any;
};

type ChatConversation = {
  ip_address: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  messages: ChatLog[];
  lastActivity: string;
};

type Estimate = {
  id: string;
  customer_name: string;
  email: string;
  phone: string | null;
  service_type: string;
  square_footage: number | null;
  estimated_cost: number;
  notes: string | null;
  created_at: string;
  status: string;
};

type TabType = 'applications' | 'chat_logs' | 'estimates';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [chatConversations, setChatConversations] = useState<ChatConversation[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          navigate('/admin');
          return;
        }
        
        setSessionChecked(true);
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/admin');
      }
    };

    checkSession();
  }, [navigate]);

  // Only fetch data after session is confirmed
  useEffect(() => {
    if (!sessionChecked) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchApplications(),
          fetchChatLogs(),
          fetchEstimates()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch data",
          type: "error"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionChecked]);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
    setApplications(data || []);
  };

  const fetchChatLogs = async () => {
    try {
      console.log('Fetching chat logs...');
      const { data, error } = await supabase
        .from('chat_logs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching chat logs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch chat logs",
          type: "error"
        });
        return;
      }

      // Group messages by IP address and email
      const conversationsMap = new Map<string, ChatConversation>();
      
      (data || []).forEach((log: ChatLog) => {
        const key = `${log.ip_address}-${log.email}`;
        
        if (!conversationsMap.has(key)) {
          conversationsMap.set(key, {
            ip_address: log.ip_address || 'unknown',
            email: log.email,
            name: log.name,
            phone: log.phone,
            address: log.address,
            messages: [],
            lastActivity: log.created_at
          });
        }

        const conversation = conversationsMap.get(key)!;
        conversation.messages.push(log);
        conversation.lastActivity = log.created_at;
        
        // Update user details if present
        if (log.name) conversation.name = log.name;
        if (log.phone) conversation.phone = log.phone;
        if (log.address) conversation.address = log.address;
      });

      // Convert to array and sort by last activity
      const sortedConversations = Array.from(conversationsMap.values())
        .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

      console.log('Grouped conversations:', sortedConversations);
      setChatConversations(sortedConversations);
    } catch (error) {
      console.error('Error in fetchChatLogs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch chat logs",
        type: "error"
      });
    }
  };

  const fetchEstimates = async () => {
    const { data, error } = await supabase
      .from('estimates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching estimates:', error);
      throw error;
    }
    setEstimates(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const downloadResume = (application: any) => {
    if (!application.resume_text) {
      toast({
        title: "Error",
        description: "No resume available for this applicant",
        variant: "destructive"
      });
      return;
    }

    try {
      // Get the file extension from the data URL
      const match = application.resume_text.match(/^data:(.+);base64,/);
      if (!match) {
        throw new Error('Invalid resume data format');
      }

      const mimeType = match[1];
      const base64Data = application.resume_text.replace(/^data:(.+);base64,/, '');
      const binaryData = atob(base64Data);
      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      // Create blob and download
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${application.first_name}_${application.last_name}_resume${getFileExtension(mimeType)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive"
      });
    }
  };

  const getFileExtension = (mimeType: string) => {
    switch (mimeType) {
      case 'application/pdf':
        return '.pdf';
      case 'application/msword':
        return '.doc';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '.docx';
      default:
        return '';
    }
  };

  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    
    if (activeTab === 'applications') {
      return applications.filter(app => 
        app.first_name.toLowerCase().includes(query) ||
        app.last_name.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.position.toLowerCase().includes(query)
      );
    } else if (activeTab === 'chat_logs') {
      return chatConversations.filter(conversation =>
        conversation.email.toLowerCase().includes(query) ||
        conversation.name?.toLowerCase().includes(query) ||
        conversation.phone?.toLowerCase().includes(query) ||
        conversation.address?.toLowerCase().includes(query)
      );
    } else {
      return estimates.filter(est =>
        est.customer_name.toLowerCase().includes(query) ||
        est.email.toLowerCase().includes(query) ||
        est.service_type.toLowerCase().includes(query)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            {/* Search Bar */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-roofing-orange focus:border-transparent"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 ${
                  activeTab === 'applications'
                    ? 'text-roofing-orange border-b-2 border-roofing-orange'
                    : 'text-gray-500 hover:text-roofing-orange'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('chat_logs')}
                className={`px-4 py-2 ${
                  activeTab === 'chat_logs'
                    ? 'text-roofing-orange border-b-2 border-roofing-orange'
                    : 'text-gray-500 hover:text-roofing-orange'
                }`}
              >
                Chat Logs
              </button>
              <button
                onClick={() => setActiveTab('estimates')}
                className={`px-4 py-2 ${
                  activeTab === 'estimates'
                    ? 'text-roofing-orange border-b-2 border-roofing-orange'
                    : 'text-gray-500 hover:text-roofing-orange'
                }`}
              >
                Estimates
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-roofing-orange" />
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTab === 'applications' && filteredData().map((app: Application) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{`${app.first_name} ${app.last_name}`}</h3>
                          <p className="text-gray-600">{app.position}</p>
                          <p className="text-sm text-gray-500">{app.email}</p>
                          <p className="text-sm text-gray-400">
                            Applied: {format(new Date(app.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                        {app.resume_text && (
                          <button
                            onClick={() => downloadResume(app)}
                            className="flex items-center px-3 py-1 text-roofing-orange hover:bg-roofing-orange/10 rounded"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Resume
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {activeTab === 'chat_logs' && (
                    <div className="space-y-6">
                      {filteredData().map((conversation: ChatConversation) => (
                        <div key={`${conversation.ip_address}-${conversation.email}`} 
                             className="bg-white rounded-lg shadow overflow-hidden">
                          <div className="bg-gray-50 p-4 border-b">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{conversation.email}</h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p>IP: {conversation.ip_address}</p>
                                  {conversation.name && <p>Name: {conversation.name}</p>}
                                  {conversation.phone && <p>Phone: {conversation.phone}</p>}
                                  {conversation.address && <p>Address: {conversation.address}</p>}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                Last active: {new Date(conversation.lastActivity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-4">
                            {conversation.messages.map((message, index) => (
                              <div key={message.id} 
                                   className={`flex ${message.user_type === 'assistant' ? 'justify-start' : 'justify-end'} mb-4`}>
                                <div className={`rounded-lg p-3 max-w-[80%] ${
                                  message.user_type === 'assistant' 
                                    ? 'bg-blue-50 border border-blue-100' 
                                    : 'bg-green-50 border border-green-100'
                                }`}>
                                  <div className="text-xs text-gray-500 mb-1">
                                    {message.user_type === 'assistant' ? 'Bot' : 'User'} • {new Date(message.created_at).toLocaleString()}
                                  </div>
                                  <p className="whitespace-pre-wrap text-gray-800">{message.message}</p>
                                  {/* Show arrow connector if next message is a response */}
                                  {index < conversation.messages.length - 1 && 
                                   message.user_type !== conversation.messages[index + 1].user_type && (
                                    <div className={`w-2 h-4 ${
                                      message.user_type === 'assistant' ? 'border-r border-blue-200' : 'border-r border-green-200'
                                    }`} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {chatConversations.length === 0 && !loading && (
                        <div className="text-center py-8 text-gray-500">
                          No chat conversations found
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'estimates' && filteredData().map((est: Estimate) => (
                    <motion.div
                      key={est.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{est.customer_name}</h3>
                          <p className="text-gray-600">{est.service_type}</p>
                          <p className="text-sm text-gray-500">{est.email}</p>
                          {est.phone && (
                            <p className="text-sm text-gray-500">{est.phone}</p>
                          )}
                          <p className="text-sm text-gray-400">
                            Created: {format(new Date(est.created_at), 'MMM d, yyyy')}
                          </p>
                          {est.notes && (
                            <p className="mt-2 text-sm text-gray-600">{est.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-roofing-orange">
                            ${est.estimated_cost.toLocaleString()}
                          </p>
                          {est.square_footage && (
                            <p className="text-sm text-gray-500">
                              {est.square_footage} sq ft
                            </p>
                          )}
                          <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                            est.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            est.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {est.status.charAt(0).toUpperCase() + est.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
