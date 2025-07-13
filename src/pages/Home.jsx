import { FaUserShield, FaFileUpload, FaChartLine, FaMobileAlt, FaGlobe, FaUsers, FaArrowRight, FaCheck, FaStar, FaPlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const DocifyHomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: FaUserShield, title: "Professional Profile Management", desc: "Easily create and maintain your professional profile with all your skills, experience, and education in one place." },
    { icon: FaFileUpload, title: "CV Upload & Management", desc: "Upload, update, and manage your CV with our simple interface. Keep your professional documents current." },
    { icon: FaChartLine, title: "Performance Analytics", desc: "Track how often your profile is viewed and downloaded to understand your professional reach." },
    { icon: FaMobileAlt, title: "Mobile Friendly", desc: "Access and update your profile from any device. Your portfolio looks great on phones, tablets, and desktops." },
    { icon: FaGlobe, title: "Public Portfolio", desc: "Get a personalized URL to share your professional profile with potential employers and clients." },
    { icon: FaUsers, title: "Networking Made Easy", desc: "Connect with other professionals and expand your network through our platform." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Navigation */}
     

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-bounce delay-2000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-float-delay-1"></div>
          <div className="absolute bottom-40 left-1/4 w-8 h-8 bg-blue-400 rounded-full animate-float-delay-2"></div>
          <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-indigo-400 rounded-full animate-float"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-sm">
              ✨ Transform Your Professional Presence
            </span>
          </div> */}
          
          <h1 className="text-3xl mt-16 md:text-5xl font-bold mb-6 whitespace-nowrap bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent leading-tight
">
            Your Career,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Amplified
            </span>
          </h1>
          
          <p className="text-xl md:text-xl mb-8 max-w-3xl mx-auto text-white/80 leading-relaxed">
            Create stunning professional profiles that get noticed. Join <span className="text-cyan-400 font-semibold">50,000+</span> professionals who trust Docify to showcase their expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <button className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 hover:from-cyan-500 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2">
              Start Building Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all backdrop-blur-sm border border-white/20 flex items-center gap-2">
              <FaPlay className="text-cyan-400" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-white/60 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">98%</div>
              <div className="text-white/60 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-white/60 text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">5⭐</div>
              <div className="text-white/60 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why <span className="text-cyan-400">Professionals</span> Choose Docify
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience the next generation of professional portfolio management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-2 ring-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-cyan-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-5xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="relative bg-gradient-to-b from-slate-800 to-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get Started in <span className="text-cyan-400">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              From signup to success in minutes, not hours
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform -translate-y-1/2"></div>
            
            {[
              { num: "01", title: "Create Your Account", desc: "Sign up in seconds with your email or social accounts" },
              { num: "02", title: "Build Your Profile", desc: "Add your skills, experience, and upload your documents" },
              { num: "03", title: "Share & Grow", desc: "Get your personalized URL and start networking" }
            ].map((step, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by <span className="text-cyan-400">Professionals</span> Worldwide
            </h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
              <span className="text-white/70 ml-2">4.9/5 from 10,000+ reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Developer",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                content: "Docify transformed my job search completely. The design is stunning and I landed my dream job within 2 weeks!"
              },
              {
                name: "Michael Chen",
                role: "UX Designer",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                content: "As a designer, I'm picky about aesthetics. Docify's interface is absolutely gorgeous and so easy to use."
              },
              {
                name: "Priya Patel",
                role: "Marketing Manager",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                content: "The analytics feature is incredible. I can see exactly how my profile performs and optimize accordingly."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 ring-2 ring-cyan-400/50"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/80 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 animate-pulse"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-cyan-100">Dominate</span> Your Industry?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the elite professionals who use Docify to showcase their expertise and accelerate their careers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
              Start Your Journey
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all backdrop-blur-sm border border-white/20">
              Schedule Demo
            </button>
          </div>
          
          <div className="flex justify-center items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>No Credit Card Required</span>
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
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 3s ease-in-out infinite 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 3s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default DocifyHomePage;