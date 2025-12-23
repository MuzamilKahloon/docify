import { useState } from 'react';
import { FaPaintBrush, FaEye, FaCheck, FaCrown } from 'react-icons/fa';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Minimal', 'Creative', 'Professional', 'Modern'];

  const templates = [
    {
      id: 1,
      name: "Elite Monolith",
      category: "Modern",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "A dark, high-contrast theme focused on bold typography and glassmorphism."
    },
    {
      id: 2,
      name: "Clean Canvas",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Pure white backgrounds with elegant serif fonts for a distraction-free experience."
    },
    {
      id: 3,
      name: "Tech Pulse",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "Grid-based layout with interactive code blocks and technical aesthetic."
    },
    {
      id: 4,
      name: "Artistic Flow",
      category: "Creative",
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Fluid animations and vibrant gradients for creative professionals."
    },
    {
      id: 5,
      name: "Executive Suite",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92fb1ab?auto=format&fit=crop&w=800&q=80",
      isPremium: true,
      description: "Classic corporate look with professional color palettes and structured sections."
    },
    {
      id: 6,
      name: "Ghostly Minimal",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      isPremium: false,
      description: "Ultra-minimalist design with subtle shadows and thin lines."
    }
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Choose Your Template
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select a design that matches your professional personality and stand out from the crowd.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                selectedCategory === cat 
                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                  : 'border-white/10 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-400 bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500"
            >
              {/* Template Image */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105">
                    <FaEye /> Preview
                  </button>
                  <button className="flex items-center gap-2 bg-cyan-500 text-white px-6 py-2 rounded-full font-bold hover:bg-cyan-600 transition-all transform hover:scale-105">
                    <FaCheck /> Select
                  </button>
                </div>

                {template.isPremium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <FaCrown size={10} /> PREMIUM
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{template.name}</h3>
                  <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">
                    {template.category}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <FaPaintBrush size={12} /> Customizable
                  </div>
                  <span className="text-cyan-400 text-sm font-semibold">Free to use</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom CTA */}
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-3xl border border-cyan-400/20 backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold mb-4">Want a Custom Design?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Our team can help you build a completely bespoke portfolio template tailored to your specific industry requirements.
          </p>
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
