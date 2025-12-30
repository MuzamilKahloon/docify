import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  ArrowRight, 
  Linkedin, 
  Github, 
  Award,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  Zap,
  Crown,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Target,
  Briefcase,
  Mail
} from 'lucide-react';

const ShowcasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const showcaseRef = useRef(null);
  const portfoliosPerPage = 9;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const filters = [
    { id: 'all', label: 'All Talents', icon: Users, count: 36 },
    { id: 'featured', label: 'Featured', icon: Crown, count: 12 },
    { id: 'developers', label: 'Developers', icon: Zap, count: 18 },
    { id: 'designers', label: 'Designers', icon: Target, count: 9 },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp, count: 7 }
  ];

  const portfolios = [
    {
      id: 1,
      name: "Alex Thompson",
      username: "alextech",
      role: "Senior Full Stack Developer",
      company: "Google",
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      views: 1240,
      isFeatured: true,
      rating: 4.9,
      projects: 42,
      location: "San Francisco, CA",
      tags: ["Frontend", "Backend", "DevOps"]
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      username: "elena_design",
      role: "Product Design Lead",
      company: "Figma",
      skills: ["UX Design", "Figma", "Branding", "User Research", "Prototyping"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      views: 890,
      isFeatured: true,
      rating: 4.8,
      projects: 28,
      location: "New York, NY",
      tags: ["UI/UX", "Product", "Research"]
    },
    {
      id: 3,
      name: "David Kim",
      username: "davidk",
      role: "Data Scientist",
      company: "OpenAI",
      skills: ["Machine Learning", "Python", "TensorFlow", "SQL", "Data Analysis"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      views: 1560,
      isFeatured: false,
      rating: 4.7,
      projects: 31,
      location: "Seattle, WA",
      tags: ["AI/ML", "Data", "Analytics"]
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      username: "sjenkins",
      role: "Marketing Strategist",
      company: "Meta",
      skills: ["SEO", "Content Strategy", "Digital Ads", "Analytics", "Growth"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      views: 1420,
      isFeatured: true,
      rating: 4.9,
      projects: 37,
      location: "Austin, TX",
      tags: ["Marketing", "Growth", "Strategy"]
    },
    {
      id: 5,
      name: "Marcus Wright",
      username: "mwright",
      role: "Cybersecurity Analyst",
      company: "CrowdStrike",
      skills: ["Security Oversight", "Firewalls", "Linux", "Pen Testing", "Networking"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      views: 2110,
      isFeatured: true,
      rating: 4.9,
      projects: 45,
      location: "Boston, MA",
      tags: ["Security", "Infrastructure", "Networking"]
    },
    {
      id: 6,
      name: "Lisa Wong",
      username: "lisawong",
      role: "Frontend Engineer",
      company: "Stripe",
      skills: ["Vue.js", "TypeScript", "Tailwind", "Vite", "Testing", "Performance"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      views: 1230,
      isFeatured: false,
      rating: 4.6,
      projects: 24,
      location: "Remote",
      tags: ["Frontend", "Performance", "Web"]
    },
    {
      id: 7,
      name: "Ryan Chen",
      username: "ryanc",
      role: "DevOps Engineer",
      company: "Amazon Web Services",
      skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      views: 1890,
      isFeatured: true,
      rating: 4.8,
      projects: 39,
      location: "Seattle, WA",
      tags: ["DevOps", "Cloud", "Infrastructure"]
    },
    {
      id: 8,
      name: "Maya Patel",
      username: "mayap",
      role: "UX Researcher",
      company: "Airbnb",
      skills: ["User Testing", "Analytics", "Prototyping", "Qualitative Research"],
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
      views: 960,
      isFeatured: false,
      rating: 4.7,
      projects: 22,
      location: "San Francisco, CA",
      tags: ["Research", "UX", "Analytics"]
    },
    {
      id: 9,
      name: "James Wilson",
      username: "jwilson",
      role: "Backend Developer",
      company: "Spotify",
      skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Redis"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      views: 1750,
      isFeatured: true,
      rating: 4.8,
      projects: 33,
      location: "Stockholm, Sweden",
      tags: ["Backend", "Java", "Microservices"]
    }
  ];

  const filteredPortfolios = portfolios.filter(p => {
    if (activeFilter === 'featured' && !p.isFeatured) return false;
    if (activeFilter === 'developers' && !p.tags?.some(t => ['Frontend', 'Backend', 'DevOps'].includes(t))) return false;
    if (activeFilter === 'designers' && !p.tags?.some(t => ['UI/UX', 'Product', 'Design'].includes(t))) return false;
    if (activeFilter === 'marketing' && !p.tags?.some(t => ['Marketing', 'Growth', 'Strategy'].includes(t))) return false;
    
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const totalPages = Math.ceil(filteredPortfolios.length / portfoliosPerPage);
  const currentPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * portfoliosPerPage,
    currentPage * portfoliosPerPage
  );

  const openPortfolioModal = (portfolio) => {
    setSelectedPortfolio(portfolio);
    document.body.style.overflow = 'hidden';
  };

  const closePortfolioModal = () => {
    setSelectedPortfolio(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-violet-50 min-h-screen pt-24 pb-20" style={{ fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
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
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-500/10 to-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6 border border-purple-200">
              <Sparkles size={16} />
              Community Showcase
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover <span className="gradient-text">Extraordinary</span><br />Talent
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore professional portfolios from our community. Get inspired by exceptional work, 
              connect with industry leaders, and discover how top talent showcases their expertise.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                to="/login"
                className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Create Your Portfolio
                <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-3.5 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all">
                View Success Stories
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 fade-up">
            <div className="glass-effect p-6 rounded-2xl border border-purple-100 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <p className="text-sm text-gray-600">Portfolios Created</p>
            </div>
            <div className="glass-effect p-6 rounded-2xl border border-purple-100 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-sm text-gray-600">Job Success Rate</p>
            </div>
            <div className="glass-effect p-6 rounded-2xl border border-purple-100 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
            <div className="glass-effect p-6 rounded-2xl border border-purple-100 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9★</div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="py-12 px-6 fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="glass-effect rounded-2xl border border-purple-100 p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, role, skill, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/50 border-2 border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all text-lg placeholder-gray-400"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${activeFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg' : 'bg-white/50 text-gray-700 border-2 border-gray-200 hover:border-purple-300'}`}
                  >
                    <filter.icon size={16} />
                    {filter.label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.id ? 'bg-white/20' : 'bg-purple-100 text-purple-600'}`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Info */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-purple-600">{filteredPortfolios.length}</span> portfolios
                {searchQuery && (
                  <span className="ml-2">
                    for "<span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </div>
              <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
                <Filter size={16} />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Label */}
      <section className="py-6 px-6 fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Crown className="text-amber-400" size={32} fill="currentColor" />
              <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-sm"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured <span className="gradient-text">Talent</span>
              </h2>
              <p className="text-gray-600">Hand-picked exceptional portfolios from our community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-6 px-6 fade-up" ref={showcaseRef}>
        <div className="max-w-7xl mx-auto">
          {currentPortfolios.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPortfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="card-hover group flex flex-col bg-white border-2 border-purple-100 rounded-2xl overflow-hidden hover:border-purple-300 relative"
                  >
                    {/* Featured Badge */}
                    {portfolio.isFeatured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          <Star size={10} fill="currentColor" />
                          FEATURED
                        </div>
                      </div>
                    )}

                    {/* Profile Header */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-purple-100 transition-all">
                            <img 
                              src={portfolio.image} 
                              alt={portfolio.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-lg">
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded">
                              {portfolio.rating}★
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {portfolio.name}
                          </h3>
                          <p className="text-purple-600 font-semibold">{portfolio.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{portfolio.company}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <Eye size={14} />
                              {portfolio.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <Target size={14} />
                              {portfolio.projects} projects
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Tags */}
                    <div className="px-6 pb-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.skills.slice(0, 4).map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100 group-hover:border-purple-200 transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                        {portfolio.skills.length > 4 && (
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                            +{portfolio.skills.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {portfolio.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-600 rounded-md text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 pb-6 mt-auto">
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                            <Linkedin size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                            <Github size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                            <Mail size={18} />
                          </button>
                        </div>
                        <button
                          onClick={() => openPortfolioModal(portfolio)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-200 transition-all transform hover:scale-105"
                        >
                          View Portfolio
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-4 left-6">
                      <span className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                        📍 {portfolio.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === i + 1 ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gradient-to-br from-white to-purple-50 rounded-2xl border-2 border-dashed border-purple-200">
              <div className="inline-flex p-4 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full mb-6">
                <Search size={48} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No portfolios found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Try adjusting your search or filters to discover amazing talent.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  setCurrentPage(1);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Showcase<br />Your Talent?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've landed their dream opportunities through Docify.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 shadow-xl"
              >
                Create Your Portfolio Free
                <ArrowRight size={22} />
              </Link>
              <p className="text-purple-200 text-sm mt-6">
                No credit card required • Free forever for students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {selectedPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Portfolio Details</h3>
                <button
                  onClick={closePortfolioModal}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="lg:w-1/3">
                  <div className="sticky top-24">
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                      <div className="flex flex-col items-center text-center mb-6">
                        <img 
                          src={selectedPortfolio.image} 
                          alt={selectedPortfolio.name} 
                          className="w-32 h-32 rounded-2xl object-cover ring-4 ring-white shadow-xl mb-4"
                        />
                        <h4 className="text-2xl font-bold text-gray-900">{selectedPortfolio.name}</h4>
                        <p className="text-purple-600 font-semibold">{selectedPortfolio.role}</p>
                        <p className="text-gray-600 text-sm mt-1">@{selectedPortfolio.username}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Briefcase size={18} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Company</p>
                            <p className="font-semibold">{selectedPortfolio.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target size={18} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Projects</p>
                            <p className="font-semibold">{selectedPortfolio.projects} completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Eye size={18} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Views</p>
                            <p className="font-semibold">{selectedPortfolio.views.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star size={18} className="text-amber-400" fill="currentColor" />
                          <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <p className="font-semibold">{selectedPortfolio.rating}/5.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:w-2/3">
                  {/* Skills */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedPortfolio.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPortfolio.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">24h</div>
                      <p className="text-sm text-gray-600">Avg. Response</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                      <p className="text-sm text-gray-600">Verified</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">#1</div>
                      <p className="text-sm text-gray-600">Top Rated</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/profile/${selectedPortfolio.username}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <Eye size={18} />
                      View Full Portfolio
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all">
                      <Mail size={18} />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowcasePage;