import React, { useState, useEffect } from 'react';
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
  Activity
} from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Thompson', email: 'alex@example.com', status: 'Active', portfolios: 3, joined: '2023-10-12' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah@example.com', status: 'Active', portfolios: 1, joined: '2023-11-05' },
    { id: 3, name: 'Marcus Wright', email: 'marcus@example.com', status: 'Deactivated', portfolios: 0, joined: '2023-09-20' },
    { id: 4, name: 'Elena Rodriguez', email: 'elena@example.com', status: 'Active', portfolios: 5, joined: '2023-12-01' },
    { id: 5, name: 'David Kim', email: 'david@example.com', status: 'Active', portfolios: 2, joined: '2023-11-15' },
  ]);

  const [queries, setQueries] = useState([
    { id: 1, user: 'Alex Thompson', subject: 'Template Customization', status: 'Pending', priority: 'High', date: '2023-12-23' },
    { id: 2, user: 'Sarah Jenkins', subject: 'Billing Question', status: 'Solved', priority: 'Medium', date: '2023-12-20' },
    { id: 3, user: 'Guest User', subject: 'Partnership Inquiry', status: 'Pending', priority: 'Low', date: '2023-12-24' },
    { id: 4, user: 'Marcus Wright', subject: 'Account Access', status: 'Solved', priority: 'High', date: '2023-12-22' },
  ]);

  const stats = [
    { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Portfolios', value: '3,456', change: '+18%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Queries', value: '24', change: '-5%', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Revenue (MTD)', value: '$12.4k', change: '+24%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User removed successfully");
  };

  const handleResolveQuery = (id) => {
    setQueries(queries.map(q => q.id === id ? { ...q, status: 'Solved' } : q));
    toast.success("Query marked as resolved");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              Admin Control Panel
            </h1>
            <p className="text-gray-500 mt-1 font-medium">Manage users, solve queries, and monitor platform activity.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold hover:bg-purple-600 transition-all shadow-lg shadow-gray-200">
            <TrendingUp size={18} />
            View Full Reports
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tabs & Search */}
          <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex p-1 bg-gray-100 rounded-2xl w-full lg:w-auto">
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'users' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users List
              </button>
              <button 
                onClick={() => setActiveTab('queries')}
                className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'queries' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Customer Queries
              </button>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:outline-none transition-all text-sm font-medium"
                />
              </div>
              <button className="p-2.5 bg-gray-50 text-gray-500 rounded-2xl hover:bg-white hover:text-purple-600 hover:border-purple-100 border border-transparent transition-all">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {activeTab === 'users' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Portfolios</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 leading-none">{user.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          user.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-700">{user.portfolios}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                            <ArrowUpRight size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User / Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {queries.map((query) => (
                    <tr key={query.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900 leading-none">{query.subject}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Mail size={10} /> {query.user}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${
                          query.priority === 'High' ? 'text-red-500' : 
                          query.priority === 'Medium' ? 'text-amber-500' : 'text-blue-500'
                        }`}>
                          {query.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {query.status === 'Solved' ? (
                            <>
                              <CheckCircle2 className="text-emerald-500" size={14} />
                              <span className="text-xs font-bold text-emerald-600">Solved</span>
                            </>
                          ) : (
                            <>
                              <Clock className="text-amber-500 animate-pulse" size={14} />
                              <span className="text-xs font-bold text-amber-600">Pending</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{query.date}</td>
                      <td className="px-6 py-4 text-right text-sm">
                        {query.status !== 'Solved' ? (
                          <button 
                            onClick={() => handleResolveQuery(query.id)}
                            className="text-purple-600 font-bold hover:underline"
                          >
                            Mark as Solved
                          </button>
                        ) : (
                          <span className="text-gray-400">Archived</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Custom Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-purple-200">
            <h4 className="text-xl font-black mb-2">New User?</h4>
            <p className="text-purple-100 text-sm mb-6 leading-relaxed">Manually register a user for institutional clients or special partnerships.</p>
            <button className="w-full py-3 bg-white text-purple-600 font-black rounded-2xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
              <UserPlus size={18} />
              Provision Account
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-2xl text-gray-600">
                <MessageSquare size={24} />
              </div>
              <h4 className="text-lg font-black text-gray-900">Broadcast Message</h4>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">Send a system-wide notification to all registered portfolios.</p>
            <button className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Compose Announcement <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-2xl text-gray-600">
                <Shield size={24} />
              </div>
              <h4 className="text-lg font-black text-gray-900">Security Audit</h4>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">Review platform logs and check for suspicious activity or bot behavior.</p>
            <button className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View Access Logs <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
