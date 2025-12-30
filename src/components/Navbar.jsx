import React, { useState, useEffect, useRef } from 'react';
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
  Shield,
  Star,
  Rocket
} from 'lucide-react';
import { toast } from 'react-toastify';
import { profileService } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('docify_user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setCurrentUser(userObj);
      
      // Fetch profile to get the real username for the link
      const loadProfile = async () => {
        try {
          const profile = await profileService.getMyProfile();
          setCurrentUser(prev => ({ ...prev, username: profile.username }));
        } catch (err) {
          console.error("Navbar profile load error:", err);
        }
      };
      loadProfile();
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-lg shadow-purple-100/30' 
        : 'py-5 bg-gradient-to-r from-purple-50/80 via-violet-50/80 to-purple-50/80 backdrop-blur-lg'
    }`} style={{ fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
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

        .nav-glow::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
          animation: pulseGlow 4s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-primary:hover {
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3);
          transform: translateY(-2px);
        }

        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #c084fc);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu-enter {
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .user-menu-fade {
          animation: fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Floating decorative elements */}
        {!scrolled && (
          <>
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400/40 to-violet-400/40 animate-float" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 animate-float [animation-delay:1s]" />
          </>
        )}

        <div className="flex justify-between items-center h-14 relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
              <div className="nav-glow absolute inset-0" />
              <Sparkles className="w-7 h-7 text-white relative z-10" />
            </div>
            <span className={`text-2xl font-black tracking-tight transition-all duration-300 ${
              scrolled ? 'text-gray-900' : 'text-purple-900'
            } gradient-text group-hover:animate-gradientShift`}>
              Docify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center p-1 bg-white/70 backdrop-blur-md rounded-full border border-purple-100 shadow-sm">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name}
                  to={link.path}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) => `
                    relative px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 nav-link
                    ${isActive 
                      ? 'text-purple-600 bg-white shadow-md' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {currentUser && (
              <NavLink 
                to="/dashboard"
                onClick={handleNavLinkClick}
                className={({ isActive }) => `
                  relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300
                  ${isActive 
                    ? 'text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg shadow-purple-200' 
                    : 'text-purple-600 bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-600 hover:text-white border border-purple-200'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </div>
              </NavLink>
            )}

            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-purple-200 to-transparent" />

            {currentUser ? (
              <div className="relative user-menu" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 pl-3 pr-4 py-2 bg-white/90 hover:bg-white backdrop-blur-md border border-purple-100 rounded-full shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-purple-600 font-bold overflow-hidden ring-2 ring-purple-200 shadow-inner">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="font-bold" />
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-700 max-w-[120px] truncate">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className={`text-purple-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180 text-purple-600' : 'group-hover:text-purple-600'}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden user-menu-fade">
                    <div className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 border-b border-purple-100">
                      <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Signed in as</p>
                      <p className="text-sm font-black text-gray-900 truncate">{currentUser.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link 
                        to="/dashboard" 
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group"
                      >
                        <LayoutDashboard size={18} className="text-purple-400 group-hover:text-purple-600" />
                        <span className="flex-1">Dashboard</span>
                        <div className="w-2 h-2 rounded-full bg-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      {currentUser?.isAdmin && (
                        <Link 
                          to="/admin" 
                          onClick={handleNavLinkClick}
                          className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group"
                        >
                          <Shield size={18} className="text-purple-400 group-hover:text-purple-600" />
                          <span className="flex-1">Admin Panel</span>
                          <Star size={14} className="text-purple-300" />
                        </Link>
                      )}
                      <Link 
                        to={currentUser?.username ? `/profile/${currentUser.username}` : '#'} 
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group"
                      >
                        <UserCircle size={18} className="text-purple-400 group-hover:text-purple-600" />
                        <span className="flex-1">My Public Profile</span>
                        <div className="w-2 h-2 rounded-full bg-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link 
                        to="/settings" 
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group"
                      >
                        <Settings size={18} className="text-purple-400 group-hover:text-purple-600" />
                        <span className="flex-1">Settings</span>
                        <div className="w-2 h-2 rounded-full bg-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                    <div className="p-2 border-t border-purple-100">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                      >
                        <LogOut size={18} className="text-red-400 group-hover:text-red-500" />
                        <span className="flex-1">Sign Out</span>
                        <div className="w-2 h-2 rounded-full bg-red-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                >
                  Sign In
                </Link>
                <Link 
                  to="/login" 
                  className="btn-primary px-6 py-2.5 text-sm font-bold text-white rounded-full shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Rocket size={16} />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-all shadow-sm ${
              scrolled ? 'bg-white text-purple-600' : 'bg-white/90 text-purple-600 backdrop-blur-md'
            } hover:scale-110`}
          >
            {isOpen ? <X size={22} className="font-bold" /> : <Menu size={22} className="font-bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-x-0 top-[88px] bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-2xl transition-all duration-400 transform ${
        isOpen ? 'translate-y-0 opacity-100 mobile-menu-enter' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={handleNavLinkClick}
              className={({ isActive }) => `
                block px-6 py-4 rounded-2xl text-lg font-bold transition-all flex items-center gap-3
                ${isActive 
                  ? 'text-purple-600 bg-purple-50 shadow-md' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }
              `}
            >
              <div className={`w-3 h-3 rounded-full ${(() => {
                switch(link.name) {
                  case 'Home': return 'bg-purple-500';
                  case 'Templates': return 'bg-violet-500';
                  case 'Showcase': return 'bg-pink-500';
                  default: return 'bg-purple-300';
                }
              })()} opacity-60`} />
              {link.name}
            </NavLink>
          ))}
          {currentUser && (
            <NavLink
              to="/dashboard"
              onClick={handleNavLinkClick}
              className={({ isActive }) => `
                block px-6 py-4 rounded-2xl text-lg font-bold transition-all flex items-center gap-3
                ${isActive 
                  ? 'text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg' 
                  : 'text-purple-600 bg-purple-50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-600 hover:text-white'
                }
              `}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          )}
          
          <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-200 to-transparent my-6 mx-8" />

          {!currentUser ? (
            <div className="grid grid-cols-1 gap-4 pt-4">
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="px-6 py-4 rounded-2xl text-center font-bold text-purple-600 bg-purple-50 border-2 border-purple-200 hover:bg-purple-100 transition-all flex items-center justify-center gap-3"
              >
                <User size={18} />
                Sign In
              </Link>
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="btn-primary px-6 py-4 rounded-2xl text-center font-bold text-white flex items-center justify-center gap-3 shadow-lg"
              >
                <Rocket size={18} />
                Join Now
              </Link>
            </div>
          ) : (
            <div className="space-y-3 bg-purple-50/50 rounded-3xl p-4 border border-purple-100">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-purple-600 font-bold text-xl shadow-inner ring-2 ring-purple-200">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    currentUser.email[0].toUpperCase()
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="font-black text-gray-900 truncate text-base">{currentUser.displayName || 'User'}</p>
                  <p className="text-sm font-semibold text-purple-600 truncate">{currentUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link
                  to={currentUser?.username ? `/profile/${currentUser.username}` : '#'}
                  onClick={handleNavLinkClick}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-gray-700 hover:text-purple-600 hover:bg-white transition-all"
                >
                  <UserCircle size={20} className="text-purple-400" />
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} className="text-red-400" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;