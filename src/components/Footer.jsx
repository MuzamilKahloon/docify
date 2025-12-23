import React from 'react';
import { 
  Sparkles, 
  Linkedin, 
  Github, 
  Instagram, 
  FileText, 
  Target, 
  BarChart3, 
  Users, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Building, 
  DollarSign, 
  Video, 
  Send 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Docify
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Revolutionizing career development for professionals worldwide. We bridge the gap between skills and opportunities.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Github, Instagram].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-purple-900/50 hover:bg-purple-600 border border-purple-800 hover:border-purple-500 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Platform</h4>
              <ul className="space-y-4">
                {[
                  { name: 'AI CV Builder', icon: FileText },
                  { name: 'Job Tracker', icon: Target },
                  { name: 'Career Analytics', icon: BarChart3 },
                  { name: 'Mock Interviews', icon: Users },
                  { name: 'Skill Assessment', icon: Award }
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all hover:translate-x-2">
                      <item.icon size={16} className="transition-colors" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Resources</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Career Blog', icon: BookOpen },
                  { name: 'Learning Paths', icon: GraduationCap },
                  { name: 'Company Reviews', icon: Building },
                  { name: 'Salary Insights', icon: DollarSign },
                  { name: 'Webinars', icon: Video }
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all hover:translate-x-2">
                      <item.icon size={16} className="transition-colors" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-6">
                Get career tips and job opportunities delivered to your inbox.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-purple-900/30 border border-purple-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <Send size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-0.5">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-purple-900/50">
            {[
              { number: '50K+', label: 'Active Professionals' },
              { number: '500+', label: 'Partner Companies' },
              { number: '10K+', label: 'Jobs Posted' },
              { number: '95%', label: 'Success Rate' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-12">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                All systems operational
              </div>
              <div className="text-sm text-gray-500">
                © 2025 Docify. Crafted with ❤️ for professionals worldwide
              </div>
            </div>
            
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Support'].map((item, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-105 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-10 left-1/4 w-16 h-16 bg-violet-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
