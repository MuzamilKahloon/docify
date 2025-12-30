import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Linkedin, Github, Twitter, ExternalLink, 
  MapPin, Calendar, Briefcase, GraduationCap, Target, 
  Zap, Download, Edit2, ArrowLeft, Loader2, Sparkles,
  FileText, FileType, Eye
} from 'lucide-react';
import { profileService, API_URL } from '../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await profileService.getProfile(username);
        setUserData(data);
        
        // Check if the current logged-in user is the owner
        const savedUser = localStorage.getItem('docify_user');
        if (savedUser) {
          const loggedInUser = JSON.parse(savedUser);
          // Compare loggedInUser.user._id with data.user._id or data.user
          const ownerId = data.user?._id || data.user;
          const currentUserId = loggedInUser.user?._id || loggedInUser.id;
          if (currentUserId === ownerId) {
            setIsOwner(true);
          }
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Profile not found or still being baked 🪄");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
  };

  const handleDownloadCv = async () => {
    if (!userData?.cv?.url) return;
    try {
      await profileService.incrementCvDownload(username);
      window.open(getFullUrl(userData.cv.url), '_blank');
    } catch (err) {
      console.error("Download tracking error:", err);
      // Still open the link even if tracking fails
      window.open(getFullUrl(userData.cv.url), '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-purple-900 font-bold text-xl">Summoning profile...</p>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <User className="w-12 h-12 text-red-400" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">{error || "User not found"}</p>
        <Link to="/" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-full shadow-lg hover:translate-y-[-2px] transition-all">
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 pb-20 pt-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');
        .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); }
        .btn-primary { background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; }
      `}</style>
      
      <div className="max-w-5xl mx-auto px-4">
        {/* Navigation Bar for Public View */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all">
            <ArrowLeft size={18} /> <span className="hidden sm:inline">Back to Docify</span>
          </Link>
          
          {isOwner && (
            <Link 
              to="/dashboard" 
              className="px-6 py-2 btn-primary rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Edit2 size={16} /> Edit Profile
            </Link>
          )}
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl overflow-hidden shadow-2xl mb-8 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} className="text-white" />
          </div>
          <div className="p-8 sm:p-12 relative z-10 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative">
                {userData.profilePicture ? (
                  <img 
                    src={getFullUrl(userData.profilePicture)} 
                    alt={userData.name} 
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-8 ring-white/20 shadow-2xl"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 flex items-center justify-center ring-8 ring-white/20 backdrop-blur-md">
                    <User size={60} className="text-white/80" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-400 rounded-full border-4 border-purple-600 flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-4xl sm:text-6xl font-black mb-3 tracking-tight">{userData.name}</h1>
                <p className="text-lg sm:text-xl text-white/90 font-medium mb-6 max-w-2xl mx-auto sm:mx-0">
                  {userData.bio || "Crafting digital experiences and solving complex problems with elegant code."}
                </p>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-8">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full flex items-center gap-2 text-sm">
                    <Mail size={16} /> {userData.email}
                  </div>
                  {userData.username && (
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full flex items-center gap-2 text-sm">
                      <Target size={16} /> docify.com/{userData.username}
                    </div>
                  )}
                </div>

                <div className="flex justify-center sm:justify-start gap-3">
                  {[
                    { icon: Linkedin, url: userData.socialLinks?.linkedin },
                    { icon: Github, url: userData.socialLinks?.github },
                    { icon: Twitter, url: userData.socialLinks?.twitter },
                    { icon: ExternalLink, url: userData.socialLinks?.website }
                  ].filter(link => link.url).map((link, i) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 border border-white/10 text-white"
                    >
                      <link.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {userData.cv?.url && (
                <div className="hidden lg:block">
                  <button 
                    onClick={handleDownloadCv}
                    className="flex flex-col items-center bg-white p-8 rounded-3xl text-purple-600 hover:bg-purple-50 transition-all shadow-xl group"
                  >
                    <Download size={32} className="mb-3 group-hover:bounce transition-all" />
                    <span className="text-sm font-bold uppercase tracking-wider">Download CV</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Skills */}
            <div className="glass-card rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap size={22} className="text-purple-600" /> Professional Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {(userData.skills || []).map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-2xl text-sm font-bold border border-purple-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            {userData.cv?.url && (
              <div className="glass-card rounded-3xl p-8 shadow-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FileText size={22} className="text-purple-600" /> Documents
                </h2>
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-purple-600 shadow-sm">
                    <FileType size={24} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-gray-900 truncate">{userData.cv.fileName || "Resume.pdf"}</p>
                    <p className="text-xs text-gray-500">Official Curriculum Vitae</p>
                  </div>
                </div>
                <button 
                  onClick={handleDownloadCv}
                  className="w-full py-3 bg-white border-2 border-purple-100 rounded-xl font-bold text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Eye size={18} /> View in New Tab
                </button>
              </div>
            )}

            {/* Mobile CV Download */}
            {userData.cv?.url && (
              <div className="lg:hidden">
                <button 
                  onClick={handleDownloadCv}
                  className="w-full py-5 btn-primary rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-xl"
                >
                  <Download /> Download CV
                </button>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <div className="glass-card rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Briefcase size={26} className="text-purple-600" /> Journey & Experience
              </h2>
              <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-1 before:bg-purple-100">
                {(userData.experience || []).map((exp, i) => (
                  <div key={i} className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-white border-4 border-purple-500 shadow-lg flex items-center justify-center z-10 group-hover:bg-purple-500 transition-all">
                      <Briefcase size={16} className="text-purple-600 group-hover:text-white transition-all" />
                    </div>
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="text-purple-600 font-bold">{exp.company}</span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Calendar size={14} /> {exp.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed bg-white/40 p-4 rounded-2xl border border-purple-50/50">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-card rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap size={26} className="text-purple-600" /> Academic Foundation
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {(userData.education || []).map((edu, i) => (
                  <div key={i} className="p-6 bg-white/50 rounded-2xl border border-purple-50 hover:border-purple-200 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-all">
                      <GraduationCap size={20} className="text-purple-600 group-hover:text-white transition-all" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold mb-2">{edu.institution}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar size={14} /> {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="glass-card rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Target size={26} className="text-purple-600" /> Featured Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {(userData.projects || []).map((project, i) => (
                  <div key={i} className="p-6 bg-gradient-to-br from-white to-purple-50/30 rounded-2xl border border-purple-100 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 transition-all">
                        <Target size={20} className="text-violet-600 group-hover:text-white transition-all" />
                      </div>
                      <a href="#" className="p-2 text-gray-400 hover:text-purple-600 transition-all">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
