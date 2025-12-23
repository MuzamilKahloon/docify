import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  LayoutDashboard,
  UserCircle,
  Settings,
  Bell,
  Shield
} from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage
    const savedUser = localStorage.getItem('docify_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleNavLinkClick = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('docify_user');
    setCurrentUser(null);
    toast.success("Successfully logged out", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored"
    });
    handleNavLinkClick();
    navigate('/login');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'Showcase', path: '/showcase' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-sm' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white md:text-gray-900'
            }`}>
              Docify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center px-2 py-1 bg-gray-100/50 backdrop-blur-md rounded-full border border-gray-200/50">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
                    }
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {currentUser && (
              <NavLink 
                to="/dashboard"
                className={({ isActive }) => `
                  ml-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-purple-600 bg-gray-100/50 hover:bg-white border border-gray-200/50'
                  }
                `}
              >
                Dashboard
              </NavLink>
            )}

            <div className="ml-4 h-8 w-[1px] bg-gray-200"></div>

            {currentUser ? (
              <div className="relative user-menu ml-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-gray-200 rounded-full hover:border-purple-300 transition-all shadow-sm group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-purple-600 font-bold overflow-hidden ring-2 ring-purple-50">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-b border-gray-100">
                      <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-black text-gray-900 truncate">{currentUser.email}</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        to="/dashboard" 
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      {user && user.isAdmin && (
                        <Link 
                          to="/admin" 
                          onClick={handleNavLinkClick}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                        >
                          <Shield size={18} />
                          Admin Panel
                        </Link>
                      )}
                      <Link 
                        to="/profile" 
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                      >
                        <UserCircle size={18} />
                        My Public Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                      >
                        <Settings size={18} />
                        Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Link 
                  to="/login" 
                  className="px-6 py-2 text-sm font-bold text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/login" 
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-full hover:bg-purple-600 transition-all shadow-md hover:shadow-purple-200 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-all ${
              scrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/20 text-white backdrop-blur-md'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-x-0 top-[72px] bg-white border-b border-gray-100 shadow-xl transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={handleNavLinkClick}
              className={({ isActive }) => `
                block px-4 py-3 rounded-2xl text-base font-bold transition-all
                ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
          {currentUser && (
            <NavLink
              to="/dashboard"
              onClick={handleNavLinkClick}
              className={({ isActive }) => `
                block px-4 py-3 rounded-2xl text-base font-bold transition-all
                ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              Dashboard
            </NavLink>
          )}
          
          <div className="h-[1px] bg-gray-100 mx-4"></div>

          {!currentUser ? (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="px-4 py-3 rounded-2xl text-center font-bold text-gray-700 bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="px-4 py-3 rounded-2xl text-center font-bold text-white bg-purple-600 shadow-lg shadow-purple-100"
              >
                Join Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 px-4 py-3 bg-purple-50 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    currentUser.email[0].toUpperCase()
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-gray-900 truncate">{currentUser.displayName || 'User'}</p>
                  <p className="text-xs font-bold text-purple-600 truncate">{currentUser.email}</p>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={handleNavLinkClick}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
              >
                <UserCircle size={20} />
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
