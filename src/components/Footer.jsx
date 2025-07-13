import { useState } from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaArrowUp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaRocket,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Templates', href: '#templates' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'API', href: '#api' }
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Partners', href: '#partners' },
      { name: 'Contact', href: '#contact' }
    ],
    Resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Case Studies', href: '#cases' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
      { name: 'Security', href: '#security' }
    ]
  };

  const socialLinks = [
    { Icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { Icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { Icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { Icon: FaGithub, href: '#', label: 'GitHub', color: 'hover:text-gray-400' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-400/60 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-blue-400/60 rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-indigo-400/60 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-400/60 rounded-full animate-float"></div>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Stay ahead of the <span className="text-cyan-400">curve</span>
                </h3>
                <p className="text-white/70 text-lg mb-6">
                  Get the latest updates, career tips, and exclusive content delivered straight to your inbox.
                </p>
                <div className="flex items-center space-x-4 text-white/60">
                  <div className="flex items-center space-x-2">
                    <FaRocket className="text-cyan-400" />
                    <span>Weekly insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-400" />
                    <span>No spam, ever</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md lg:ml-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribed}
                    className={`group px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                      subscribed
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
                    }`}
                  >
                    {subscribed ? (
                      <>
                        <span>Subscribed!</span>
                        <FaHeart className="text-red-300" />
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="relative mr-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="white" strokeWidth="2"/>
                      <path d="M8 9H16M8 13H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  Docify
                </span>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Empowering professionals worldwide to showcase their expertise and accelerate their careers through stunning digital portfolios.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-white/60">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <FaEnvelope className="text-cyan-400" />
                  <span>hello@docify.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <FaPhone className="text-cyan-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-white/60 transition-all duration-300 hover:bg-slate-700/50 hover:border-cyan-400/50 hover:scale-110 ${color}`}
                    aria-label={label}
                  >
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-6 text-lg">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-cyan-400 transition-colors duration-300 group flex items-center"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-white/50 text-sm">© 2024 Docify. All rights reserved.</p>
                <div className="flex items-center space-x-1 text-white/50 text-sm">
                  <span>Made with</span>
                  <FaHeart className="text-red-400 animate-pulse" />
                  <span>by the Docify team</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 text-white/50 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                </div>
                <button
                  onClick={scrollToTop}
                  className="group w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:from-cyan-500 hover:to-blue-600 transform hover:scale-110 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  aria-label="Scroll to top"
                >
                  <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay-1 {
          animation: float 4s ease-in-out infinite 1s;
        }
        .animate-float-delay-2 {
          animation: float 4s ease-in-out infinite 2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;