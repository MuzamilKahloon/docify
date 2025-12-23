import { useState } from 'react';
import { FaSearch, FaFilter, FaEye, FaArrowRight, FaLinkedin, FaGithub, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ShowcasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const portfolios = [
    {
      id: 1,
      name: "Alex Thompson",
      username: "alextech",
      role: "Senior Full Stack Developer",
      skills: ["React", "Python", "Docker"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      views: 1240,
      isFeatured: true
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      username: "elena_design",
      role: "Product Designer @ Figma",
      skills: ["UX Design", "Figma", "Branding"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      views: 890,
      isFeatured: true
    },
    {
      id: 3,
      name: "David Kim",
      username: "davidk",
      role: "Data Scientist",
      skills: ["Machine Learning", "R", "SQL"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      views: 560,
      isFeatured: false
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      username: "sjenkins",
      role: "Marketing Strategist",
      skills: ["SEO", "Content Strategy", "Ads"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      views: 420,
      isFeatured: false
    },
    {
      id: 5,
      name: "Marcus Wright",
      username: "mwright",
      role: "Cybersecurity Analyst",
      skills: ["Security Oversight", "Firewalls", "Linux"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      views: 1100,
      isFeatured: true
    },
    {
      id: 6,
      name: "Lisa Wong",
      username: "lisawong",
      role: "Frontend Engineer",
      skills: ["Vue.js", "Tailwind", "Vite"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      views: 230,
      isFeatured: false
    }
  ];

  const filteredPortfolios = portfolios.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community <span className="text-cyan-400">Showcase</span>
            </h1>
            <p className="text-xl text-slate-400">
              Explore professional portfolios built with Docify. Get inspired and see howothers are showcasing their expertise.
            </p>
          </div>
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all shrink-0"
          >
            Create Yours Now <FaArrowRight />
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all text-lg"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-8 py-4 hover:bg-white/10 hover:border-cyan-400/50 transition-all font-medium text-slate-300">
            <FaFilter /> Filters
          </button>
        </div>

        {/* Featured Label */}
        <div className="flex items-center gap-3 mb-8">
          <FaAward className="text-amber-400 text-2xl" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Featured Talent</h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolios.map(p => (
            <div key={p.id} className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500">
              {/* Profile Card Top */}
              <div className="relative p-6 pb-0 flex items-center gap-5">
                <div className="relative shrink-0">
                  <img src={p.image} alt={p.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-cyan-400/50 transition-all" />
                  {p.isFeatured && (
                    <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 p-1.5 rounded-lg shadow-lg">
                      <FaAward size={12} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium">{p.role}</p>
                  <p className="text-slate-500 text-xs mt-1">@{p.username}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6 min-h-[72px] content-start">
                  {p.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-white/5 group-hover:border-cyan-400/20 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-3">
                    <button className="text-slate-500 hover:text-cyan-400 transition-colors p-2 bg-white/5 rounded-lg">
                      <FaLinkedin size={16} />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors p-2 bg-white/5 rounded-lg">
                      <FaGithub size={16} />
                    </button>
                  </div>
                  <Link 
                    to={`/profile/${p.username}`}
                    className="flex items-center gap-2 text-sm font-bold bg-white text-slate-900 px-5 py-2 rounded-xl hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105"
                  >
                    View Portfolio <FaEye />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPortfolios.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FaSearch className="mx-auto text-4xl text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No portfolios found</h3>
            <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowcasePage;
