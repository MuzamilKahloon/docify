import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { communityService, API_URL } from '../services/api';
import { Send, Users, MessageSquare, Sparkles, User, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const socket = io(API_URL.replace('/api', '')); // Connect to base server URL

const CommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('docify_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    if (!socketRef.current) {
      socketRef.current = io(API_URL.replace('/api', ''), {
        transports: ['websocket'],
        reconnection: true
      });
    }

    const socket = socketRef.current;

    fetchHistory();

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('join_community');
    });

    socket.on('receive_community_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    if (socket.connected) {
      socket.emit('join_community');
    }

    return () => {
      socket.off('receive_community_message');
      socket.off('connect');
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const history = await communityService.getHistory();
      setMessages(history);
    } catch (error) {
      toast.error("Failed to load community history");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userId = currentUser?._id || currentUser?.id;
    if (!newMessage.trim() || !userId || !socketRef.current) return;

    socketRef.current.emit('send_community_message', {
      senderId: userId,
      text: newMessage
    });

    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col glass-card overflow-hidden rounded-[2.5rem] shadow-2xl border border-purple-100">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-purple-600 to-violet-600 text-white flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl" />
          </div>
          
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg">
                <Users size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight leading-none">Community Hub</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-purple-100 font-bold uppercase tracking-widest">Live Discussions</p>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-md">
              <Sparkles size={16} className="text-purple-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-100">Docify Elite</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white/50 backdrop-blur-sm"
        >
          {messages.map((msg, i) => {
            const userId = currentUser?._id || currentUser?.id;
            const isMe = userId && msg.sender?._id === userId;
            return (
              <div 
                key={i} 
                className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-purple-600 shadow-inner overflow-hidden ring-2 ring-purple-50">
                    {msg.sender?.photoURL ? (
                      <img src={msg.sender.photoURL} alt={msg.sender.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                </div>

                {/* Message Content */}
                <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && (
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1 mb-1.5 flex items-center gap-1.5">
                      {msg.sender?.displayName || 'Anonymous User'}
                      {msg.sender?.username && <span className="text-gray-400 lowercase font-medium">@{msg.sender.username}</span>}
                    </span>
                  )}
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isMe 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-purple-100 text-gray-800 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1.5 mt-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Clock size={10} className="text-gray-300" />
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-purple-50 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="relative group">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share something with the community..."
                className="w-full pl-6 pr-16 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-purple-200 focus:outline-none transition-all text-sm font-bold shadow-inner"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all group"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[9px] text-center font-bold text-gray-400 mt-4 uppercase tracking-[0.3em]">
              Stay Docified • Community Guidelines Apply
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
