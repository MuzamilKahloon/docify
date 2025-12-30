import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Clock, CheckCircle2 } from 'lucide-react';
import { queryService } from '../services/api';
import { toast } from 'react-toastify';

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('list'); // 'list', 'chat', 'new'
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [initialMessage, setInitialMessage] = useState('');
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchQueries();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedQuery?.messages]);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const data = await queryService.getMyQueries();
      setQueries(data);
    } catch (error) {
      console.error("Failed to fetch queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNew = async (e) => {
    e.preventDefault();
    if (!newSubject || !initialMessage) return;
    
    setLoading(true);
    try {
      const newQuery = await queryService.createQuery(newSubject, initialMessage);
      setQueries([newQuery, ...queries]);
      setSelectedQuery(newQuery);
      setView('chat');
      setNewSubject('');
      setInitialMessage('');
      toast.success("Query sent successfully!");
    } catch (error) {
      toast.error("Failed to start conversation");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedQuery) return;

    try {
      const updatedQuery = await queryService.addMessage(selectedQuery._id, newMessage);
      setSelectedQuery(updatedQuery);
      setNewMessage('');
      // Update in list too
      setQueries(queries.map(q => q._id === updatedQuery._id ? updatedQuery : q));
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const openChat = async (query) => {
    setSelectedQuery(query);
    setView('chat');
    // Refresh query details to get full thread
    try {
      const fullQuery = await queryService.getQueryById(query._id);
      setSelectedQuery(fullQuery);
      setQueries(queries.map(q => q._id === fullQuery._id ? fullQuery : q));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');
        .chat-glass {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .message-bubble-user {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
        }
        .message-bubble-admin {
          background: white;
          border: 1px solid #f3e8ff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
        }
        .header-gradient {
          background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #8b5cf6 100%);
        }
        .animate-in-custom {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-[0_10px_30px_rgba(124,58,237,0.4)] ${
          isOpen ? 'bg-white text-purple-600 rotate-90 scale-90' : 'header-gradient text-white hover:scale-110 hover:-translate-y-1'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={32} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] max-h-[calc(100vh-120px)] h-[580px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-purple-50 overflow-hidden flex flex-col animate-in-custom">
          {/* Header */}
          <div className="p-6 header-gradient text-white relative flex-shrink-0">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl" />
            </div>
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight leading-none">Support</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-purple-100 font-bold uppercase tracking-widest">Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* View: List */}
          {view === 'list' && (
            <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {queries.length === 0 && !loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 text-purple-200">
                      <MessageSquare size={32} />
                    </div>
                    <p className="font-black text-gray-900 text-lg uppercase tracking-tight">No messages</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">Have a question? Our team is ready to help you.</p>
                  </div>
                ) : (
                  queries.map(query => (
                    <button 
                      key={query._id}
                      onClick={() => openChat(query)}
                      className="w-full p-4 bg-white rounded-2xl border border-purple-50 text-left hover:border-purple-200 hover:shadow-lg transition-all group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1 pr-4 text-sm">
                          {query.subject}
                        </p>
                        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                          query.status === 'Solved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {query.status}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 font-medium italic mb-3">
                        {query.messages[query.messages.length - 1]?.text}
                      </p>
                      <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                        <Clock size={10} />
                        {new Date(query.lastMessageAt).toLocaleDateString()}
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="p-6 bg-white border-t border-purple-50 mt-auto">
                <button 
                  onClick={() => setView('new')}
                  className="w-full py-3.5 header-gradient text-white font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
                >
                  <Plus size={14} /> New Query
                </button>
              </div>
            </div>
          )}

          {/* View: New Query */}
          {view === 'new' && (
            <div className="flex-1 flex flex-col p-6 sm:p-8 bg-white overflow-y-auto">
              <button 
                onClick={() => setView('list')}
                className="text-xs font-black text-purple-600 mb-6 flex items-center gap-2 hover:translate-x-[-2px] transition-transform uppercase tracking-widest"
              >
                ← Back to Threads
              </button>
              <h4 className="text-xl font-black text-gray-900 mb-1">Start a Conversation</h4>
              <p className="text-gray-500 text-xs mb-6 font-medium leading-relaxed">Our support heroes will get back to you soon.</p>
              
              <form onSubmit={handleStartNew} className="space-y-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Brief summary..."
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-purple-200 focus:outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    required
                    rows="4"
                    value={initialMessage}
                    onChange={(e) => setInitialMessage(e.target.value)}
                    placeholder="How can we help?"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-purple-200 focus:outline-none transition-all text-sm font-bold resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 header-gradient text-white font-black rounded-xl shadow-lg transition-all disabled:opacity-50 uppercase tracking-widest text-[10px]"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}

          {/* View: Chat Thread */}
          {view === 'chat' && (
            <div className="flex-1 flex flex-col h-full bg-gray-50/30 overflow-hidden">
              <div className="px-6 py-3 bg-white border-b border-purple-50 flex items-center justify-between flex-shrink-0">
                <button 
                  onClick={() => setView('list')}
                  className="text-[10px] font-black text-purple-600 flex items-center gap-1 hover:translate-x-[-2px] transition-transform uppercase tracking-widest"
                >
                  ← Threads
                </button>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedQuery?.status === 'Solved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                    {selectedQuery?.status}
                  </span>
                </div>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
              >
                {selectedQuery?.messages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.isAdmin 
                        ? 'bg-white border border-purple-50 text-gray-800 rounded-tl-sm shadow-sm' 
                        : 'header-gradient text-white rounded-tr-sm shadow-md font-medium'
                    }`}>
                      {msg.text}
                      <p className={`text-[9px] mt-2 font-black uppercase tracking-tighter ${msg.isAdmin ? 'text-gray-400' : 'text-purple-200'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 sm:p-6 bg-white border-t border-purple-50 flex-shrink-0">
                <div className="relative">
                  <input 
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Your reply..."
                    className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-purple-200 focus:outline-none transition-all text-sm font-bold shadow-inner"
                    disabled={selectedQuery?.status === 'Solved'}
                  />
                  <button 
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center header-gradient text-white rounded-lg shadow-md hover:scale-105 transition-all"
                    disabled={!newMessage.trim() || selectedQuery?.status === 'Solved'}
                  >
                    <Send size={16} />
                  </button>
                </div>
                {selectedQuery?.status === 'Solved' && (
                  <p className="text-[9px] text-center font-black text-gray-400 mt-3 uppercase tracking-widest">
                    This Conversation is Archived
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default SupportWidget;
