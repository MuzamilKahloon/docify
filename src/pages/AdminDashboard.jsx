import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { toast } from 'react-toastify';
import { 
  Users, 
  MessageSquare, 
  Shield, 
  Search, 
  MoreVertical, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  UserPlus,
  Filter,
  ArrowUpRight,
  Mail,
  Activity,
  Ban, 
  Unlock, 
  Calendar,
  AlertCircle,
  X,
  Zap,
  Briefcase,
  BarChart3,
  Award,
  ChevronDown,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Home,
  Send
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Suspension Modal State
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendDuration, setSuspendDuration] = useState('60');
  const [suspendReason, setSuspendReason] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersData = await adminService.getUsers();
      const queriesData = await adminService.getQueries();
      setUsers(usersData);
      setQueries(queriesData);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this user? This action cannot be undone.")) {
      try {
        await adminService.deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
        toast.success("User removed successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleBlockUser = async (id) => {
    try {
      await adminService.blockUser(id);
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: true } : u));
      toast.success("User blocked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (id) => {
    try {
      await adminService.unblockUser(id);
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: false } : u));
      toast.success("User unblocked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleSuspendUser = async () => {
    if (!suspendReason) {
      toast.error("Please provide a reason for suspension");
      return;
    }
    try {
      await adminService.suspendUser(selectedUser._id, suspendDuration, suspendReason);
      const suspendedUntil = new Date();
      suspendedUntil.setMinutes(suspendedUntil.getMinutes() + parseInt(suspendDuration));
      
      setUsers(users.map(u => u._id === selectedUser._id ? { 
        ...u, 
        suspendedUntil: suspendedUntil.toISOString(),
        suspensionReason: suspendReason 
      } : u));
      
      toast.success(`User suspended for ${suspendDuration} minutes`);
      setShowSuspendModal(false);
      setSuspendReason('');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to suspend user");
    }
  };

  const stats = [
    { 
      label: 'Total Users', 
      value: users.length.toString(), 
      change: '+12%', 
      icon: Users, 
      color: 'from-blue-500 to-cyan-400',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    { 
      label: 'Active Portfolios', 
      value: users.reduce((acc, u) => acc + (u.portfolios || 0), 0).toString(), 
      change: '+18%', 
      icon: Briefcase, 
      color: 'from-purple-500 to-violet-400',
      bg: 'bg-gradient-to-br from-purple-50 to-violet-50'
    },
    { 
      label: 'Pending Queries', 
      value: queries.filter(q => q.status !== 'Solved').length.toString(), 
      change: '-5%', 
      icon: MessageSquare, 
      color: 'from-amber-500 to-orange-400',
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50'
    },
    { 
      label: 'Revenue (MTD)', 
      value: '$12.4k', 
      change: '+24%', 
      icon: TrendingUp, 
      color: 'from-emerald-500 to-green-400',
      bg: 'bg-gradient-to-br from-emerald-50 to-green-50'
    },
  ];

  const [selectedAdminQuery, setSelectedAdminQuery] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleResolveQuery = async (id) => {
    try {
      await adminService.resolveQuery(id);
      setQueries(queries.map(q => q._id === id ? { ...q, status: 'Solved' } : q));
      if (selectedAdminQuery?._id === id) {
        setSelectedAdminQuery({ ...selectedAdminQuery, status: 'Solved' });
      }
      toast.success("Query marked as resolved");
    } catch (error) {
      toast.error("Failed to resolve query");
    }
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedAdminQuery) return;

    setIsReplying(true);
    try {
      const updatedQuery = await adminService.addMessage(selectedAdminQuery._id, replyText);
      setSelectedAdminQuery(updatedQuery);
      setReplyText('');
      setQueries(queries.map(q => q._id === updatedQuery._id ? updatedQuery : q));
      toast.success("Reply sent");
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setIsReplying(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQueries = queries.filter(query => 
    query.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    query.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof query.user === 'string' && query.user.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50" style={{ fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
        .gradient-text {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(124, 58, 237, 0.15);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-primary:hover {
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3);
          transform: translateY(-2px);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.1);
        }
      `}</style>

      {/* Admin Header */}
      <header className="glass-effect fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Admin Portal</h1>
              <p className="text-xs text-gray-500 font-medium">Powered by Docify</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl hover:bg-white/50 transition-all relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-bold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@docify.com</p>
                  </div>
                  <button className="w-full p-3 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="w-full p-3 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </button>
                  <button className="w-full p-3 text-left flex items-center gap-2 hover:bg-red-50 text-red-600 transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-purple-700 text-sm font-semibold mb-4 border border-purple-200 shadow-sm">
              <Sparkles size={16} />
              Admin Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome Back, <span className="gradient-text">Admin</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Monitor platform activity, manage users, and ensure seamless operations across the Docify ecosystem.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className={`stat-card p-6 rounded-3xl relative overflow-hidden card-hover`}>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                  <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-8 rounded-3xl text-white shadow-2xl shadow-purple-200/50 card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <UserPlus size={24} />
                </div>
                <h4 className="text-xl font-black">Provision Account</h4>
              </div>
              <p className="text-purple-100 text-sm mb-6 leading-relaxed">
                Manually register institutional clients or special partnership accounts with custom permissions.
              </p>
              <button className="w-full py-3.5 bg-white text-purple-600 font-bold rounded-2xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2 shadow-lg">
                <UserPlus size={18} />
                Create Account
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <MessageSquare size={24} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Broadcast Message</h4>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Send important announcements, updates, or notifications to all platform users instantly.
              </p>
              <button className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all group">
                Compose Announcement 
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <Shield size={24} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Security Audit</h4>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Review access logs, monitor suspicious activities, and enhance platform security protocols.
              </p>
              <button className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all group">
                View Security Logs
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Main Interface */}
          <div className="bg-white rounded-3xl border border-purple-100 shadow-lg overflow-hidden">
            {/* Tabs & Search */}
            <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex p-1 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl w-full lg:w-auto">
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === 'users' 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <Users size={16} />
                    Users Management
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('queries')}
                  className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === 'queries' 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <MessageSquare size={16} />
                    Support Queries
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab === 'users' ? 'users...' : 'queries...'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-300 focus:outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-purple-100"
                  />
                </div>
                <button className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-600 rounded-2xl hover:from-purple-100 hover:to-violet-100 transition-all border border-purple-100">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              {activeTab === 'users' ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-50 to-violet-50">
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">User Profile</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Portfolios</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Joined Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            Loading users...
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                          <div className="flex flex-col items-center gap-3">
                            <Search className="w-12 h-12 text-gray-300" />
                            <p>No users found matching your search.</p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-purple-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg uppercase shadow-lg">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 leading-none">{user.name}</p>
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <Mail size={10} /> {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {user.isAdmin && (
                              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-sm">
                                Admin
                              </span>
                            )}
                            {user.isBlocked ? (
                              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm">
                                Blocked
                              </span>
                            ) : user.suspendedUntil && new Date(user.suspendedUntil) > new Date() ? (
                              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm" title={user.suspensionReason}>
                                Suspended
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm">
                                Active
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-black text-gray-900">
                            {user.portfolios || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {!user.isAdmin && (
                              <>
                                {user.isBlocked ? (
                                  <button 
                                    onClick={() => handleUnblockUser(user._id)}
                                    className="p-2.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-200"
                                    title="Unblock User"
                                  >
                                    <Unlock size={18} />
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handleBlockUser(user._id)}
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-200"
                                    title="Block User"
                                  >
                                    <Ban size={18} />
                                  </button>
                                )}
                                <button 
                                  onClick={() => { setSelectedUser(user); setShowSuspendModal(true); }}
                                  className="p-2.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all border border-transparent hover:border-amber-200"
                                  title="Suspend User"
                                >
                                  <Calendar size={18} />
                                </button>
                              </>
                            )}
                            <button className="p-2.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all border border-transparent hover:border-purple-200">
                              <ArrowUpRight size={18} />
                            </button>
                            {!user.isAdmin && (
                              <button 
                                onClick={() => handleDeleteUser(user._id)}
                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-200"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-50 to-violet-50">
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Query Details</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            Loading queries...
                          </div>
                        </td>
                      </tr>
                    ) : filteredQueries.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                          <div className="flex flex-col items-center gap-3">
                            <MessageSquare className="w-12 h-12 text-gray-300" />
                            <p>No queries found matching your search.</p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredQueries.map((query) => (
                      <tr key={query._id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900 leading-none">{query.subject}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Mail size={10} /> {query.user?.name || query.user || "Guest User"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                            query.priority === 'High' 
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 
                            query.priority === 'Medium' 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                          }`}>
                            {query.priority || 'Medium'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {query.status === 'Solved' ? (
                              <>
                                <div className="p-1.5 rounded-lg bg-emerald-50">
                                  <CheckCircle2 className="text-emerald-500" size={14} />
                                </div>
                                <span className="text-xs font-bold text-emerald-600">Solved</span>
                              </>
                            ) : (
                              <>
                                <div className="p-1.5 rounded-lg bg-amber-50 animate-pulse">
                                  <Clock className="text-amber-500" size={14} />
                                </div>
                                <span className="text-xs font-bold text-amber-600">Pending</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(query.createdAt || query.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setSelectedAdminQuery(query)}
                              className="px-4 py-2 bg-purple-50 text-purple-600 text-sm font-bold rounded-xl hover:bg-purple-100 transition-all border border-purple-100"
                            >
                              View Thread
                            </button>
                            {query.status !== 'Solved' && (
                              <button 
                                onClick={() => handleResolveQuery(query._id)}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all"
                              >
                                Mark as Solved
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Query Chat Modal */}
      {selectedAdminQuery && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg uppercase">
                  {selectedAdminQuery.user?.name?.[0] || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 line-clamp-1">{selectedAdminQuery.subject}</h3>
                  <p className="text-xs text-gray-500 font-medium">{selectedAdminQuery.user?.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAdminQuery(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">
              {selectedAdminQuery.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-3xl shadow-sm text-sm leading-relaxed ${
                    msg.isAdmin 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white' 
                      : 'bg-white border border-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                    <p className={`text-[10px] mt-2 font-medium ${msg.isAdmin ? 'text-purple-100' : 'text-gray-400'}`}>
                      {msg.isAdmin ? 'Admin' : selectedAdminQuery.user?.name} • {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddReply} className="p-6 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium resize-none min-h-[40px]"
                  rows="2"
                  disabled={selectedAdminQuery.status === 'Solved'}
                ></textarea>
                <button 
                  type="submit"
                  disabled={!replyText.trim() || isReplying || selectedAdminQuery.status === 'Solved'}
                  className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              {selectedAdminQuery.status === 'Solved' && (
                <p className="text-center text-xs text-gray-400 mt-4 font-medium flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} /> This conversation is marked as solved and archived.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Suspension Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Suspend User</h3>
              </div>
              <button 
                onClick={() => setShowSuspendModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <AlertCircle className="text-amber-600" size={24} />
                <p className="text-sm text-amber-800 font-medium">
                  Suspending <strong className="text-gray-900">{selectedUser?.name}</strong> will temporarily revoke their access to the platform.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Duration</label>
                <select 
                  value={suspendDuration}
                  onChange={(e) => setSuspendDuration(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold"
                >
                  <option value="15">15 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="1440">24 Hours</option>
                  <option value="10080">7 Days</option>
                  <option value="43200">30 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Reason for Suspension</label>
                <textarea 
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  placeholder="e.g., Suspicious activity, violating terms, inappropriate content..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium min-h-[100px] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowSuspendModal(false)}
                  className="flex-1 py-3 px-4 rounded-2xl font-bold border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSuspendUser}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-gray-300/50 transition-all"
                >
                  Suspend User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;