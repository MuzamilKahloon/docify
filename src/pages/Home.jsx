import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Briefcase, 
  Zap, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Linkedin, 
  Github, 
  Instagram, 
  Play, 
  Pause, 
  Star, 
  CheckCircle,
  FileText,
  Target,
  BarChart3,
  Award,
  BookOpen,
  GraduationCap,
  Building,
  DollarSign,
  Video,
  Send,
  Sparkles
} from 'lucide-react';

const DocifyHomePage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [displayedStats, setDisplayedStats] = useState({ students: 0, jobs: 0, success: 0, companies: 0 });
  const [scrollY, setScrollY] = useState(0);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
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

  useEffect(() => {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          const interval = setInterval(() => {
            setDisplayedStats(prev => {
              const newStats = {
                students: Math.min(prev.students + 1000, 50000),
                jobs: Math.min(prev.jobs + 200, 10000),
                success: Math.min(prev.success + 2, 95),
                companies: Math.min(prev.companies + 2, 100)
              };
              
              if (newStats.students >= 50000 && newStats.jobs >= 10000 && 
                  newStats.success >= 95 && newStats.companies >= 100) {
                clearInterval(interval);
              }
              
              return newStats;
            });
          }, 30);
          
          return () => clearInterval(interval);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => statsObserver.disconnect();
  }, [statsAnimated]);

  const features = [
    {
      icon: Briefcase,
      title: "Job Board",
      description: "Explore verified internships and full-time opportunities tailored to your skills and interests"
    },
    {
      icon: Zap,
      title: "AI CV Review",
      description: "Get instant, intelligent feedback and improve your resume quality with our advanced AI engine"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Engage with thousands of peers, share ideas, ask questions, and grow together"
    },
    {
      icon: TrendingUp,
      title: "Application Tracker",
      description: "Organize all your applications in one place and never miss a deadline"
    }
  ];

  const steps = [
    { number: "01", title: "Create Profile", description: "Set up your professional student profile" },
    { number: "02", title: "Explore Opportunities", description: "Browse thousands of verified jobs" },
    { number: "03", title: "Enhance CV", description: "Get AI-powered feedback on your resume" },
    { number: "04", title: "Track & Succeed", description: "Monitor applications and celebrate wins" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "Stanford University",
      text: "This platform literally transformed my job search. I went from struggling to find opportunities to getting 5 interview calls within 2 weeks.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Marcus Thompson",
      university: "MIT",
      text: "The community forum connected me with people facing the same challenges. Not only did I land an internship, but I made lifelong friends too.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      name: "Priya Patel",
      university: "Harvard Business School",
      text: "The application tracker saved me so much time. I was able to manage 50+ applications efficiently and got my dream role.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden" style={{ fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-violet-50">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#7c3aed" d="M47.1,-57.5C59.9,-49.5,68.5,-33.5,72.3,-16.2C76.1,1.1,75.1,19.7,67.6,35.2C60.1,50.7,46.1,63.1,29.7,69.8C13.3,76.5,-5.5,77.5,-22.8,72.8C-40.1,68.1,-55.9,57.7,-65.4,43.2C-74.9,28.7,-78.1,10.1,-75.6,-7.5C-73.1,-25.1,-65,-41.7,-52.8,-50C-40.6,-58.3,-24.3,-58.3,-7.5,-59.8C9.3,-61.3,34.3,-65.5,47.1,-57.5Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a855f7" d="M41.3,-54.5C53.5,-45.2,63.3,-32.5,68.4,-18.1C73.5,-3.7,73.9,12.4,67.9,25.8C61.9,39.2,49.5,49.9,35.5,57.8C21.5,65.7,5.9,70.8,-10.5,70.5C-26.9,70.2,-44.1,64.5,-56.8,54.1C-69.5,43.7,-77.7,28.6,-78.9,12.8C-80.1,-3,-74.3,-19.5,-64.8,-32.5C-55.3,-45.5,-42.1,-55,-27.8,-63.2C-13.5,-71.4,1.9,-78.3,16.5,-76.6C31.1,-74.9,29.1,-63.8,41.3,-54.5Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-24">
          <div className="mb-6 inline-block">
            <span className="px-5 py-2 rounded-full text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200">
              🎓 Trusted by 50,000+ Students Worldwide
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Launch Your<br />
            <span className="gradient-text">Professional Career</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with real opportunities, refine your skills with AI-powered feedback, and build your professional presence on the most advanced platform.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <button className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg">
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-3.5 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all">
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-purple-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-purple-600" />
              <span>Free forever</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ChevronDown size={24} className="text-purple-600" />
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 bg-gradient-to-r from-purple-900 via-violet-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {displayedStats.students.toLocaleString()}+
              </div>
              <p className="text-purple-200 font-medium">Students Empowered</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {displayedStats.jobs.toLocaleString()}+
              </div>
              <p className="text-purple-200 font-medium">Job Opportunities</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {displayedStats.success}%
              </div>
              <p className="text-purple-200 font-medium">Success Rate</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {displayedStats.companies}+
              </div>
              <p className="text-purple-200 font-medium">Partner Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-white fade-up">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-violet-100 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-4 border border-purple-200">
                <Sparkles size={16} />
                About Docify
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Built For Your <span className="gradient-text">Success</span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Docify is purpose-built for university students navigating the complex world of career development. We combine cutting-edge AI technology, a vibrant community, and verified opportunities to create the ultimate launchpad for your professional journey.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From your first CV review to landing your dream internship, we're with you every step of the way. Join thousands of successful students who've transformed their futures on our platform.
              </p>
              <button className="group flex items-center gap-2 text-purple-600 font-bold hover:gap-4 transition-all text-lg">
                Learn Our Story
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-violet-50 fade-up">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See <span className="gradient-text">How It Works</span>
            </h2>
            <p className="text-lg text-gray-600">
              Watch our platform in action and discover your potential
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="relative h-[450px] bg-gradient-to-br from-gray-100 to-gray-200">
              {!isVideoPlaying ? (
                <>
                  <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="relative z-10 w-24 h-24 rounded-full bg-white hover:bg-purple-50 flex items-center justify-center transition-all hover:scale-110 shadow-2xl"
                    >
                      <Play size={32} className="text-purple-600 ml-1" fill="currentColor" />
                    </button>

                    <div className="absolute w-24 h-24 rounded-full border-4 border-white/50 animate-ping"></div>
                  </div>
                </>
              ) : (
                <div className="relative h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    src="https://cdn.pixabay.com/video/2019/09/14/26912-361072433_large.mp4"
                  />
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all z-20 shadow-xl"
                  >
                    <Pause size={24} className="text-purple-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white fade-up">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to accelerate your career growth and connect you with endless opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="card-hover p-8 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-purple-50 to-white fade-up">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              4 Steps to <span className="gradient-text">Career Success</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-2xl font-bold mx-auto text-white shadow-xl group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-1 bg-gradient-to-r from-purple-300 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white fade-up">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg text-gray-600">
              See what our community is saying about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="card-hover p-8 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} className="text-purple-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
                    />
                    <div>
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.university}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 fade-up relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Transform<br />Your Future?
          </h2>
          <p className="text-lg text-purple-100 mb-12 max-w-2xl mx-auto">
            Join over 50,000 students who've already started their journey to career success. Your opportunities await.
          </p>
          <button className="px-12 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto hover:shadow-2xl transition-all hover:scale-105 shadow-xl">
            Join Now & Get Started
            <ArrowRight size={22} />
          </button>
        </div>
      </section>

     
    </div>
  );
};

export default DocifyHomePage;
