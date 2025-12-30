import React, { useState, useEffect } from 'react';
import { 
  Paintbrush, 
  Eye, 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  Palette, 
  Layers,
  Star,
  Award,
  Clock,
  Users,
  ArrowRight,
  ExternalLink,
  Download,
  Edit3,
  Layout,
  Smartphone,
  Globe,
  Code,
  Wand2
} from 'lucide-react';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const categories = [
    { id: 'All', label: 'All Templates', icon: Layers, count: 24 },
    { id: 'Minimal', label: 'Minimal', icon: Edit3, count: 8 },
    { id: 'Creative', label: 'Creative', icon: Palette, count: 6 },
    { id: 'Professional', label: 'Professional', icon: Award, count: 7 },
    { id: 'Modern', label: 'Modern', icon: Zap, count: 3 }
  ];

  const templates = [
    {
      id: 1,
      name: "Elite Monolith",
      category: "Modern",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "A dark, high-contrast theme focused on bold typography and glassmorphism effects.",
      features: ["Dark Mode", "Glass Effects", "Bold Typography", "Animations"],
      usage: 1242,
      rating: 4.9,
      colorScheme: ["#7c3aed", "#a855f7", "#c084fc"],
      badge: "Most Popular"
    },
    {
      id: 2,
      name: "Clean Canvas",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Pure white backgrounds with elegant serif fonts for a distraction-free experience.",
      features: ["White Space", "Serif Fonts", "Simple Layout", "Fast Loading"],
      usage: 892,
      rating: 4.7,
      colorScheme: ["#ffffff", "#f3f4f6", "#6b7280"],
      badge: "Best for Students"
    },
    {
      id: 3,
      name: "Tech Pulse",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "Grid-based layout with interactive code blocks and technical aesthetic.",
      features: ["Code Blocks", "Grid System", "Tech UI", "Responsive"],
      usage: 1567,
      rating: 4.8,
      colorScheme: ["#0ea5e9", "#1e40af", "#1e293b"],
      badge: "Developer Favorite"
    },
    {
      id: 4,
      name: "Artistic Flow",
      category: "Creative",
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Fluid animations and vibrant gradients for creative professionals.",
      features: ["Animations", "Gradients", "Creative Layout", "Visual Effects"],
      usage: 721,
      rating: 4.6,
      colorScheme: ["#ec4899", "#f472b6", "#fbbf24"],
      badge: "Artistic"
    },
    {
      id: 5,
      name: "Executive Suite",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92fb1ab?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "Classic corporate look with professional color palettes and structured sections.",
      features: ["Corporate", "Structured", "Professional", "Formal"],
      usage: 943,
      rating: 4.8,
      colorScheme: ["#1e293b", "#475569", "#64748b"],
      badge: "Business Ready"
    },
    {
      id: 6,
      name: "Ghostly Minimal",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Ultra-minimalist design with subtle shadows and thin lines.",
      features: ["Ultra Minimal", "Subtle Shadows", "Thin Lines", "Clean"],
      usage: 632,
      rating: 4.5,
      colorScheme: ["#f8fafc", "#e2e8f0", "#94a3b8"],
      badge: "Minimalist"
    },
    {
      id: 7,
      name: "Digital Nexus",
      category: "Modern",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "Futuristic design with neon accents and cyberpunk aesthetics.",
      features: ["Neon Accents", "Futuristic", "Cyberpunk", "3D Elements"],
      usage: 489,
      rating: 4.7,
      colorScheme: ["#8b5cf6", "#06b6d4", "#10b981"],
      badge: "Trending"
    },
    {
      id: 8,
      name: "Academic Pro",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1456513080510-3449c76e84af?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Designed for academics and researchers with citation support.",
      features: ["Citations", "Academic", "Research Focus", "Formal"],
      usage: 378,
      rating: 4.6,
      colorScheme: ["#334155", "#475569", "#94a3b8"],
      badge: "For Researchers"
    },
    {
      id: 9,
      name: "Vibrant Showcase",
      category: "Creative",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "Bold colors and interactive galleries for visual portfolios.",
      features: ["Colorful", "Interactive", "Gallery Focus", "Dynamic"],
      usage: 567,
      rating: 4.8,
      colorScheme: ["#f59e0b", "#ef4444", "#3b82f6"],
      badge: "Visual Arts"
    }
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const openPreview = (template) => {
    setPreviewTemplate(template);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setPreviewTemplate(null);
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

        .color-preview {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-violet-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6 border border-purple-200">
              <Sparkles size={16} />
              Professional Templates
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Design Your <span className="gradient-text">Perfect</span><br />Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Choose from professionally designed templates that help you stand out. Each template is 
              fully customizable and optimized for success in your industry.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3 px-5 py-2 bg-white border border-purple-200 rounded-xl">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">4.8/5 from 2,500+ reviews</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2 bg-white border border-purple-200 rounded-xl">
                <Users size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Used by 50,000+ professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6 fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="glass-effect rounded-2xl border border-purple-100 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsAnimating(true);
                    setTimeout(() => setIsAnimating(false), 300);
                  }}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-200' 
                      : 'bg-white/50 text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <category.icon size={20} className={selectedCategory === category.id ? 'text-white' : 'text-purple-500'} />
                  {category.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id 
                      ? 'bg-white/20' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-6 px-6 fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="card-hover group relative bg-white border-2 border-purple-100 rounded-2xl overflow-hidden hover:border-purple-300"
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Template Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    {template.badge && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {template.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {template.isPremium && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <Crown size={12} />
                        PREMIUM
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-purple-900/80 to-transparent flex items-center justify-center gap-4 transition-all duration-300 ${
                    hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button
                      onClick={() => openPreview(template)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Eye size={18} />
                      Preview
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                      <Check size={18} />
                      Select Template
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {template.name}
                      </h3>
                      <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-lg inline-block mt-2">
                        {template.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold">{template.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Color Scheme */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Color Scheme:</span>
                      <div className="flex gap-1">
                        {template.colorScheme.map((color, index) => (
                          <div 
                            key={index}
                            className="color-preview"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users size={14} />
                        {template.usage.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < Math.floor(template.rating) ? "text-amber-400 fill-current" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                      <ExternalLink size={14} />
                      Details
                    </button>
                  </div>
                </div>

                {/* Quick Select Button */}
                <div className="absolute bottom-4 right-4">
                  <button className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg">
                    <Check size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 bg-gradient-to-br from-white to-purple-50 rounded-2xl border-2 border-dashed border-purple-200">
              <div className="inline-flex p-4 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full mb-6">
                <Layout size={48} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Try selecting a different category to find your perfect template.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Our <span className="gradient-text">Templates</span> Stand Out
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern design principles and proven success metrics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 rounded-2xl border border-purple-100 text-center card-hover">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl mb-6">
                <Smartphone size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile-First Design</h3>
              <p className="text-gray-600">
                Every template is optimized for mobile devices with perfect responsive behavior.
              </p>
            </div>

            <div className="glass-effect p-8 rounded-2xl border border-purple-100 text-center card-hover">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl mb-6">
                <Code size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">SEO Optimized</h3>
              <p className="text-gray-600">
                Built-in SEO best practices to help you rank higher in search results.
              </p>
            </div>

            <div className="glass-effect p-8 rounded-2xl border border-purple-100 text-center card-hover">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl mb-6">
                <Wand2 size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Customization</h3>
              <p className="text-gray-600">
                Visual editor with drag-and-drop functionality for easy customization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="py-20 px-6 fade-up">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 p-12 text-center">
              <div className="inline-flex p-3 bg-white/10 rounded-full mb-6">
                <Sparkles size={24} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Need a <span className="text-amber-300">Custom Design</span>?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Our design team can create a completely bespoke portfolio template tailored to your specific industry and personal brand.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-3.5 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
                  <Paintbrush size={18} />
                  Request Custom Design
                </button>
                <button className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Download size={18} />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(previewTemplate.rating) ? "text-amber-400 fill-current" : "text-gray-300"} />
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{previewTemplate.name}</h3>
                  {previewTemplate.isPremium && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      <Crown size={12} />
                      PREMIUM
                    </span>
                  )}
                </div>
                <button
                  onClick={closePreview}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Preview */}
                <div className="space-y-6">
                  <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                    <img 
                      src={previewTemplate.image} 
                      alt={previewTemplate.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {previewTemplate.usage.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">Active Users</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {previewTemplate.rating}/5
                      </div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Color Palette</h4>
                    <div className="flex gap-2">
                      {previewTemplate.colorScheme.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-12 h-12 rounded-lg mb-2 border-2 border-white shadow-lg"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-gray-600 font-mono">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Template Details</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {previewTemplate.description}
                  </p>

                  <div className="mb-8">
                    <h5 className="text-lg font-bold text-gray-900 mb-3">Key Features</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {previewTemplate.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center">
                            <Check size={12} className="text-purple-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h5 className="text-lg font-bold text-gray-900 mb-3">Compatibility</h5>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-lg text-sm font-medium">
                        All Browsers
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-lg text-sm font-medium">
                        Mobile Responsive
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-lg text-sm font-medium">
                        SEO Friendly
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-lg text-sm font-medium">
                        Fast Loading
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4">
                    <button className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Check size={20} />
                      Use This Template
                    </button>
                    <button className="w-full py-3.5 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                      <Download size={20} />
                      Download Preview Kit
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

export default TemplatesPage;