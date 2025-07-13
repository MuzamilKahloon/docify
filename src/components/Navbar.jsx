import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { auth } from '../components/Firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleNavLinkClick = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
  };

const handleLogout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!", { position: "top-center" });
    handleNavLinkClick();
  } catch (error) {
    console.error("Logout error:", error); // use the error here
    toast.error("Error logging out", { position: "bottom-center" });
  }
};



  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-cyan-400/20 shadow-lg shadow-cyan-500/10' 
        : 'bg-slate-900/80 backdrop-blur-lg border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center group">
            <div className="relative mr-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5Z" stroke="white" strokeWidth="2"/>
                  <path d="M7 8H13M7 12H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent group-hover:from-cyan-100 group-hover:to-white transition-all duration-300">
              Docify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive 
                    ? 'text-cyan-400' 
                    : 'text-white/80 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:w-full transition-all duration-300"></div>
                </>
              )}
            </NavLink>
            
            {currentUser && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-cyan-400' 
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Dashboard
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    )}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:w-full transition-all duration-300"></div>
                  </>
                )}
              </NavLink>
            )}

            {currentUser ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/10 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-white text-sm" />
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {currentUser.displayName || 'Profile'}
                  </span>
                  <FaChevronDown className={`text-xs transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-lg shadow-black/25 overflow-hidden">
                    <div className="py-2">
                      <Link 
                        to="/dashboard" 
                        onClick={handleNavLinkClick}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        onClick={handleNavLinkClick}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
                      >
                        Edit Profile
                      </Link>
                      <div className="border-t border-slate-700/50 mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-300"
                        >
                          <div className="flex items-center space-x-2">
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-lg"
                >
                  Login
                </Link>
                <Link 
                  to="/login" 
                  className="group px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <span className="flex items-center space-x-1">
                    <span>Get Started</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {currentUser && (
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-sm" />
                  )}
                </div>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
          <NavLink
            to="/"
            onClick={handleNavLinkClick}
            className={({ isActive }) => 
              `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-400/10 to-blue-500/10 text-cyan-400 border border-cyan-400/20' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          
          {currentUser && (
            <NavLink
              to="/dashboard"
              onClick={handleNavLinkClick}
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-400/10 to-blue-500/10 text-cyan-400 border border-cyan-400/20' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {!currentUser ? (
            <>
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={handleNavLinkClick}
                className="block mx-4 mt-2 text-center px-4 py-3 rounded-full text-base font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={handleNavLinkClick}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;