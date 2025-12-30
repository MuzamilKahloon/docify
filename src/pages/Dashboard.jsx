import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, User, FileText, Download, Edit2, Trash2, Plus, ExternalLink,
  Linkedin, Github, Twitter, Upload, Check, X, Save, Eye, 
  Zap, FileCheck, CloudUpload, School, Briefcase, Target, 
  Trophy, Calendar, CalendarRange, FileType, FileSearch, 
  UserCircle2, Building, Printer, DownloadCloud, Mail, 
  MailCheck, Link2, GraduationCap, Loader2, Home
} from 'lucide-react';
import { toast } from 'react-toastify';
import { profileService, API_URL } from '../services/api';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [],
    profilePicture: "",
    education: [],
    experience: [],
    projects: [],
    cv: { fileName: "", url: "", uploadedAt: "" },
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      website: ""
    },
    stats: { profileViews: 0, cvDownloads: 0, lastUpdated: "" }
  });

  const [tempData, setTempData] = useState(userData);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState({ education: null, experience: null, project: null });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getMyProfile();
      setUserData(data);
      setTempData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Don't toast error on 401 as interceptor handles it
      if (error.response?.status !== 401) {
        toast.error("Failed to load profile data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  }, []);

  const handleSocialLinkChange = useCallback((e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
    setHasUnsavedChanges(true);
  }, []);

  const handleArrayChange = useCallback((field, index, key, value) => {
    setTempData(prev => {
      const updated = [...prev[field]];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, [field]: updated };
    });
    setHasUnsavedChanges(true);
  }, []);

  const addNewItem = useCallback((field) => {
    const templates = {
      education: { degree: "", institution: "", year: "" },
      experience: { position: "", company: "", duration: "", description: "" },
      projects: { title: "", description: "" }
    };
    const newItem = { id: `new-${Date.now()}`, ...templates[field] };
    setTempData(prev => ({ ...prev, [field]: [...prev[field], newItem] }));
    setIsEditing(prev => ({ ...prev, [field]: newItem.id }));
  }, []);

  const removeItem = useCallback((field, id) => {
    setTempData(prev => ({ ...prev, [field]: prev[field].filter(item => (item.id || item._id) !== id) }));
  }, []);

  const toggleEdit = useCallback((field, id) => {
    setIsEditing(prev => ({ ...prev, [field]: prev[field] === id ? null : id }));
  }, []);

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
    }

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePicPreview(event.target?.result);
    };
    reader.readAsDataURL(file);

    try {
      const uploadToast = toast.info("Uploading profile picture...", { autoClose: false });
      const response = await profileService.uploadProfilePicture(file);
      
      // Use the profilePicture path from backend
      const picPath = response.profilePicture;
      
      setTempData(prev => ({ ...prev, profilePicture: picPath }));
      setUserData(prev => ({ ...prev, profilePicture: picPath }));
      
      toast.dismiss(uploadToast);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload picture");
    } finally {
      // Clear preview after a short delay to allow state update to propagate
      setTimeout(() => setProfilePicPreview(""), 500);
    }
  };

  const handleCvUpload = useCallback(async (file) => {
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const response = await profileService.uploadCv(file, (progress) => {
        setUploadProgress(progress);
      });
      
      const newCv = {
        fileName: response.cv.fileName,
        url: response.cv.url,
        uploadedAt: new Date(response.cv.uploadedAt).toLocaleDateString()
      };
      
      setTempData(prev => ({ ...prev, cv: newCv }));
      setUserData(prev => ({ ...prev, cv: newCv }));
      toast.success("CV uploaded successfully!");
    } catch (error) {
      console.error("CV Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload CV");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);


  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type !== "dragleave");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleCvUpload(e.dataTransfer.files[0]);
    }
  }, [handleCvUpload]);

  const saveProfile = async () => {
    try {
      setLoading(true);
      // Clean up local IDs before sending to backend
      const dataToSave = {
        ...tempData,
        education: tempData.education.map(({ id, ...rest }) => rest),
        experience: tempData.experience.map(({ id, ...rest }) => rest),
        projects: tempData.projects.map(({ id, ...rest }) => rest),
      };

      const updatedProfile = await profileService.updateProfile(dataToSave);
      setUserData(updatedProfile);
      setTempData(updatedProfile);
      setEditMode(false);
      setHasUnsavedChanges(false);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const removeCv = async () => {
    if (!window.confirm("Are you sure you want to remove your CV?")) return;
    
    try {
      await profileService.deleteCv();
      setTempData(prev => ({
        ...prev,
        cv: { fileName: "", url: "", uploadedAt: "" }
      }));
      setUserData(prev => ({
        ...prev,
        cv: { fileName: "", url: "", uploadedAt: "" }
      }));
      toast.success("CV removed");
    } catch (error) {
      toast.error("Failed to remove CV");
    }
  };

  if (loading && !userData.name) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-purple-900 font-bold text-xl">Loading your workspace...</p>
      </div>
    );
  }

  const getFullUrl = (path) => {
      if (!path) return "";
      if (path.startsWith('http')) return path;
      return `${API_URL}${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');
        .gradient-text { background: linear-gradient(135deg, #7c3aed, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-primary { background: linear-gradient(135deg, #7c3aed, #a855f7); transition: all 0.3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3); }
        .card-hover { transition: all 0.3s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15); }
        .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); }
        .upload-zone { background: linear-gradient(135deg, rgba(124,58,237,0.05), rgba(168,85,247,0.05)); border: 2px dashed #c084fc; transition: all 0.3s; }
        .upload-zone.drag-active { border-color: #7c3aed; background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.1)); transform: scale(1.02); }
        .progress-bar { background: linear-gradient(90deg, #7c3aed, #a855f7, #c084fc); background-size: 200% 100%; }
        .tab-button { flex: 1; transition: all 0.3s; padding: 10px 16px; font-size: 14px; font-weight: bold; border-radius: 50px; white-space: nowrap; }
        .tab-button.active { background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3); }
        .tab-button.inactive { color: #4b5563; }
        .tab-button.inactive:hover { background: rgba(168, 85, 247, 0.1); }
        input, textarea { transition: all 0.2s; }
        input:focus, textarea:focus { outline: none; border-color: #7c3aed !important; }
      `}</style>

      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-4 mb-6">
              <Link to="/" className="flex items-center gap-3.5 hover:opacity-80 transition-opacity group">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-black text-gray-900 leading-none">Docify</span>
                  <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Home size={10} strokeWidth={3} /> Home Interface
                  </span>
                </div>
              </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => editMode ? saveProfile() : setEditMode(true)} 
                disabled={loading}
                className={`px-5 py-2 text-sm font-bold rounded-full flex items-center gap-2 transition-all ${editMode ? 'btn-primary text-white shadow-lg' : 'text-purple-600 border-2 border-purple-200 hover:bg-purple-50'} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : (editMode ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>)}
              </button>
              {hasUnsavedChanges && editMode && (
                <span className="hidden sm:flex items-center gap-1 text-amber-600 text-xs font-bold animate-pulse">
                  <CloudUpload size={14} /> Unsaved changes
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white/60 backdrop-blur-md p-1 rounded-full border border-purple-100 mb-6">
            {[{ id: 'profile', label: 'Profile', icon: User }, { id: 'cv', label: 'CV', icon: FileText }, { id: 'preview', label: 'Preview', icon: Eye }].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`tab-button ${activeTab === tab.id ? 'active' : 'inactive'} flex items-center justify-center gap-2`}
              >
                <tab.icon size={14} /> <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile */}
            <div className="card-hover glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-lg bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                    {profilePicPreview ? (
                      <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : tempData.profilePicture ? (
                      <img src={getFullUrl(tempData.profilePicture)} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-purple-400" />
                    )}
                  </div>
                  {editMode && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-purple-50 transition-all">
                      <Upload size={16} className="text-purple-600" />
                      <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {/* Name & Email */}
                {editMode ? (
                  <>
                    <input 
                      type="text" 
                      name="name" 
                      value={tempData.name} 
                      onChange={handleInputChange} 
                      className="w-full text-2xl font-bold text-center bg-white/70 border-2 border-purple-100 rounded-xl px-4 py-3 mb-3 focus:border-purple-400"
                    />
                    <input 
                      type="email" 
                      name="email" 
                      value={tempData.email} 
                      onChange={handleInputChange} 
                      className="w-full text-center bg-white/70 border-2 border-purple-100 rounded-xl px-4 py-2 focus:border-purple-400"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold mb-2">{userData.name}</h2>
                    <p className="text-gray-500 mb-6">{userData.email}</p>
                  </>
                )}

                {/* Skills Section */}
                <div className="mt-8 pt-8 border-t border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Zap size={20} className="text-purple-600" /> Skills
                    </h3>
                    {editMode && (
                      <button 
                        onClick={() => setTempData(prev => ({ ...prev, skills: [...prev.skills, ""] }))} 
                        className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-all"
                      >
                        <Plus size={16} className="text-purple-600" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(tempData.skills || []).map((skill, i) => (
                      editMode ? (
                        <div key={i} className="flex items-center gap-2">
                          <input 
                            value={skill} 
                            onChange={(e) => {
                              const s = [...tempData.skills];
                              s[i] = e.target.value;
                              setTempData(prev => ({ ...prev, skills: s }));
                            }} 
                            className="bg-white/70 border-2 border-purple-100 rounded-full px-3 py-1 text-sm focus:border-purple-400"
                            placeholder="Add skill"
                          />
                          <button 
                            onClick={() => {
                              const s = tempData.skills.filter((_, j) => j !== i);
                              setTempData(prev => ({ ...prev, skills: s }));
                            }} 
                            className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all"
                          >
                            <X size={12} className="text-red-500" />
                          </button>
                        </div>
                      ) : (
                        skill && (
                          <span key={i} className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                            {skill}
                          </span>
                        )
                      )
                    ))}
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="mt-8 pt-8 border-t border-purple-200">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Link2 size={20} className="text-purple-600" /> Social Presence
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'linkedin', icon: Linkedin, placeholder: 'LinkedIn Profile URL' },
                      { name: 'github', icon: Github, placeholder: 'GitHub Profile URL' },
                      { name: 'twitter', icon: Twitter, placeholder: 'Twitter/X Profile URL' },
                      { name: 'website', icon: ExternalLink, placeholder: 'Personal Website URL' }
                    ].map((link) => (
                      <div key={link.name} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                          <link.icon size={18} />
                        </div>
                        {editMode ? (
                          <input 
                            name={link.name}
                            value={tempData.socialLinks?.[link.name] || ""}
                            onChange={handleSocialLinkChange}
                            placeholder={link.placeholder}
                            className="flex-1 bg-white/70 border-2 border-purple-100 rounded-xl px-4 py-2 text-sm focus:border-purple-400"
                          />
                        ) : (
                          <div className="flex-1 text-sm font-medium text-gray-700 truncate">
                            {userData.socialLinks?.[link.name] ? (
                              <a 
                                href={userData.socialLinks[link.name]} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:underline"
                              >
                                {userData.socialLinks[link.name].replace(/^https?:\/\/(www\.)?/, '')}
                              </a>
                            ) : (
                              <span className="text-gray-400 italic">Not linked yet</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8 pt-8 border-t border-purple-200">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <UserCircle2 size={20} className="text-purple-600" /> Bio
                  </h3>
                  {editMode ? (
                    <textarea 
                      name="bio" 
                      value={tempData.bio} 
                      onChange={handleInputChange} 
                      rows="4" 
                      className="w-full bg-white/70 border-2 border-purple-100 rounded-xl px-4 py-3 resize-none focus:border-purple-400"
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{userData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Education, Experience, Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Education */}
              <div className="card-hover glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <School size={24} className="text-purple-600" /> Education
                  </h3>
                  {editMode && (
                    <button 
                      onClick={() => addNewItem('education')} 
                      className="btn-primary px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2"
                    >
                      <Plus size={16} /> Add
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {(tempData.education || []).map((edu, idx) => (
                    <div key={edu.id || edu._id} className="pl-4 py-4 bg-white/60 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all">
                      {editMode && isEditing.education === (edu.id || edu._id) ? (
                        <div className="space-y-3 pr-4">
                          <input 
                            value={edu.degree} 
                            onChange={(e) => handleArrayChange('education', idx, 'degree', e.target.value)} 
                            placeholder="Degree" 
                            className="w-full bg-white border-2 border-purple-100 rounded-xl px-4 py-2 font-semibold focus:border-purple-400"
                          />
                          <input 
                            value={edu.institution} 
                            onChange={(e) => handleArrayChange('education', idx, 'institution', e.target.value)} 
                            placeholder="Institution" 
                            className="w-full bg-white border-2 border-purple-100 rounded-xl px-4 py-2 focus:border-purple-400"
                          />
                          <input 
                            value={edu.year} 
                            onChange={(e) => handleArrayChange('education', idx, 'year', e.target.value)} 
                            placeholder="Year" 
                            className="w-full bg-white border-2 border-purple-100 rounded-xl px-4 py-2 focus:border-purple-400"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => toggleEdit('education', edu.id || edu._id)} 
                              className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded-full font-bold text-sm flex items-center justify-center gap-1 hover:bg-green-200 transition-all"
                            >
                              <Check size={14} /> Done
                            </button>
                            <button 
                              onClick={() => removeItem('education', edu.id || edu._id)} 
                              className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-full font-bold text-sm flex items-center justify-center gap-1 hover:bg-red-200 transition-all"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pr-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h4>
                          <p className="text-gray-600 font-medium text-sm">{edu.institution}</p>
                          <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
                            <Calendar size={14} /> {edu.year}
                          </p>
                          {editMode && (
                            <button 
                              onClick={() => toggleEdit('education', edu.id || edu._id)} 
                              className="mt-3 text-purple-600 text-sm font-semibold flex items-center gap-1 hover:text-purple-700"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="card-hover glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase size={24} className="text-violet-600" /> Experience
                  </h3>
                  {editMode && (
                    <button 
                      onClick={() => addNewItem('experience')} 
                      className="btn-primary px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2"
                    >
                      <Plus size={16} /> Add
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {(tempData.experience || []).map((exp, idx) => (
                    <div key={exp.id || exp._id} className="pl-4 py-4 bg-white/60 rounded-2xl border border-violet-100 hover:border-violet-200 transition-all">
                      {editMode && isEditing.experience === (exp.id || exp._id) ? (
                        <div className="space-y-3 pr-4">
                          <input 
                            value={exp.position} 
                            onChange={(e) => handleArrayChange('experience', idx, 'position', e.target.value)} 
                            placeholder="Position" 
                            className="w-full bg-white border-2 border-violet-100 rounded-xl px-4 py-2 font-semibold focus:border-violet-400"
                          />
                          <input 
                            value={exp.company} 
                            onChange={(e) => handleArrayChange('experience', idx, 'company', e.target.value)} 
                            placeholder="Company" 
                            className="w-full bg-white border-2 border-violet-100 rounded-xl px-4 py-2 focus:border-violet-400"
                          />
                          <input 
                            value={exp.duration} 
                            onChange={(e) => handleArrayChange('experience', idx, 'duration', e.target.value)} 
                            placeholder="Duration" 
                            className="w-full bg-white border-2 border-violet-100 rounded-xl px-4 py-2 focus:border-violet-400"
                          />
                          <textarea 
                            value={exp.description} 
                            onChange={(e) => handleArrayChange('experience', idx, 'description', e.target.value)} 
                            placeholder="Description" 
                            rows="2" 
                            className="w-full bg-white border-2 border-violet-100 rounded-xl px-4 py-2 resize-none focus:border-violet-400"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => toggleEdit('experience', exp.id || exp._id)} 
                              className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded-full font-bold text-sm flex items-center justify-center gap-1 hover:bg-green-200 transition-all"
                            >
                              <Check size={14} /> Done
                            </button>
                            <button 
                              onClick={() => removeItem('experience', exp.id || exp._id)} 
                              className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-full font-bold text-sm flex items-center justify-center gap-1 hover:bg-red-200 transition-all"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pr-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{exp.position}</h4>
                          <p className="text-gray-600 font-medium text-sm">{exp.company}</p>
                          <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                            <CalendarRange size={14} /> {exp.duration}
                          </p>
                          <p className="text-gray-700 text-sm">{exp.description}</p>
                          {editMode && (
                            <button 
                              onClick={() => toggleEdit('experience', exp.id || exp._id)} 
                              className="mt-3 text-purple-600 text-sm font-semibold flex items-center gap-1 hover:text-purple-700"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="card-hover glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Target size={24} className="text-pink-600" /> Projects
                  </h3>
                  {editMode && (
                    <button 
                      onClick={() => addNewItem('projects')} 
                      className="btn-primary px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2"
                    >
                      <Plus size={16} /> Add
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {(tempData.projects || []).map((proj, idx) => (
                    <div key={proj.id || proj._id} className="p-4 bg-white/60 rounded-2xl border border-pink-100 hover:border-pink-200 transition-all">
                      {editMode && isEditing.project === (proj.id || proj._id) ? (
                        <div className="space-y-3">
                          <input 
                            value={proj.title} 
                            onChange={(e) => handleArrayChange('projects', idx, 'title', e.target.value)} 
                            placeholder="Title" 
                            className="w-full bg-white border-2 border-pink-100 rounded-xl px-4 py-2 font-semibold focus:border-pink-400"
                          />
                          <textarea 
                            value={proj.description} 
                            onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)} 
                            placeholder="Description" 
                            rows="2" 
                            className="w-full bg-white border-2 border-pink-100 rounded-xl px-4 py-2 resize-none focus:border-pink-400"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => toggleEdit('project', proj.id || proj._id)} 
                              className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded-full font-bold text-sm flex items-center justify-center gap-1 hover:bg-green-200 transition-all"
                            >
                              <Check size={14} /> Done
                            </button>
                            <button 
                              onClick={() => removeItem('projects', proj.id || proj._id)} 
                              className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-full font-bold text-sm flex items-center justify-center gap-1 hover:bg-red-200 transition-all"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                            <Trophy size={18} className="text-pink-600" /> {proj.title}
                          </h4>
                          <p className="text-gray-700 text-sm">{proj.description}</p>
                          {editMode && (
                            <button 
                              onClick={() => toggleEdit('project', proj.id || proj._id)} 
                              className="mt-3 text-purple-600 text-sm font-semibold flex items-center gap-1 hover:text-purple-700"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CV Tab */}
        {activeTab === "cv" && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
                  <FileText size={28} className="text-purple-600" /> CV Management
                </h2>
                <p className="text-gray-600">Upload and manage your CV</p>
              </div>
              {tempData.cv.url && (
                <button onClick={() => window.open(getFullUrl(tempData.cv.url), '_blank')} className="btn-primary px-6 py-3 rounded-full text-white font-bold flex items-center gap-2">
                  <DownloadCloud size={18} /> Download
                </button>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CloudUpload size={22} className="text-purple-600" /> Upload CV
                </h3>
                <div 
                  className={`upload-zone rounded-2xl p-8 text-center ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {isUploading ? (
                    <div>
                      <FileCheck size={48} className="mx-auto text-purple-600 mb-4 animate-pulse" />
                      <div className="w-full bg-purple-100 rounded-full h-2 mb-3 overflow-hidden">
                        <div className="progress-bar h-full rounded-full" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-sm text-gray-600">Uploading... {Math.round(uploadProgress)}%</p>
                    </div>
                  ) : (
                    <>
                      <CloudUpload size={48} className="mx-auto text-purple-400 mb-4" />
                      <p className="text-gray-600 mb-4 font-medium">Drag CV or click to browse</p>
                      <label className="cursor-pointer">
                        <div className="btn-primary px-6 py-2 rounded-full text-white font-bold inline-flex items-center gap-2">
                          <FileSearch size={16} /> Select PDF
                        </div>
                        <input type="file" accept=".pdf" onChange={(e) => e.target.files && handleCvUpload(e.target.files[0])} className="hidden" />
                      </label>
                      <p className="text-xs text-gray-400 mt-3">PDF only • Max 5MB</p>
                    </>
                  )}
                </div>
              </div>

              {/* Current CV */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileCheck size={22} className="text-violet-600" /> Current CV
                </h3>
                {tempData.cv.url ? (
                  <div className="glass-card rounded-3xl p-6 border border-purple-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                        <FileType size={20} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 truncate">{tempData.cv.fileName || "My Resume"}</p>
                        <p className="text-sm text-gray-500">{tempData.cv.uploadedAt || "Uploaded recently"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => window.open(getFullUrl(tempData.cv.url), '_blank')} className="flex-1 px-4 py-2 bg-white border-2 border-purple-200 rounded-xl font-bold text-purple-600 hover:bg-purple-50 text-sm flex items-center justify-center gap-1 transition-all">
                        <Eye size={14} /> View
                      </button>
                      <button onClick={() => window.open(getFullUrl(tempData.cv.url), '_blank')} className="flex-1 btn-primary px-4 py-2 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-1 transition-all">
                        <Download size={14} /> Download
                      </button>
                    </div>
                    {editMode && (
                      <button onClick={removeCv} className="w-full text-red-500 text-sm font-semibold hover:text-red-600 flex items-center justify-center gap-1 transition-all">
                        <Trash2 size={14} /> Remove CV
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="glass-card rounded-3xl p-12 border-2 border-dashed border-purple-200 text-center">
                    <FileCheck size={48} className="mx-auto text-purple-300 mb-6" />
                    <p className="text-gray-400 mb-6">{editMode ? "Ready for your CV upload" : "No CV uploaded yet"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === "preview" && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
                  <Eye size={28} className="text-purple-600" /> Portfolio Preview
                </h2>
                <p className="text-gray-600">How recruiters see your profile</p>
              </div>
              <button onClick={() => window.print()} className="px-6 py-3 bg-white border-2 border-purple-200 rounded-full font-bold text-purple-600 hover:bg-purple-50 text-sm flex items-center gap-2 transition-all">
                <Printer size={18} /> Print
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
              {/* Hero Section */}
              <div className="relative bg-gradient-to-r from-purple-600 to-violet-600 p-8 sm:p-12 text-white">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  {userData.profilePicture ? (
                    <img src={getFullUrl(userData.profilePicture)} alt="Profile" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-6 ring-white/20" />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center ring-6 ring-white/20">
                      <User size={40} className="text-purple-400" />
                    </div>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-5xl font-black mb-3">{userData.name}</h1>
                    <p className="text-lg sm:text-xl text-white/90 mb-4">{userData.bio}</p>
                    <div className="flex justify-center sm:justify-start gap-4">
                      {[
                        { icon: Linkedin, url: userData.socialLinks?.linkedin },
                        { icon: Github, url: userData.socialLinks?.github },
                        { icon: Twitter, url: userData.socialLinks?.twitter }
                      ].filter(s => s.url).map((s, i) => (
                        <a 
                          key={i} 
                          href={s.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:scale-110 transition-all text-white"
                        >
                          <s.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 sm:p-12 bg-gradient-to-b from-white to-purple-50">
                {/* Skills & Contact */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Zap size={22} className="text-purple-600" /> Core Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {(userData.skills || []).filter(s => s).map((s, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Mail size={20} className="text-purple-600" /> Contact
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <MailCheck size={16} className="text-purple-500" /> {userData.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Link2 size={16} className="text-purple-500" /> 
                          <Link 
                            to={`/profile/${userData.username || (userData.name && userData.name.toLowerCase().replace(/\s+/g, '-'))}`}
                            target="_blank"
                            className="text-purple-600 hover:underline font-bold"
                          >
                            docify.com/{userData.username || (userData.name && userData.name.toLowerCase().replace(/\s+/g, '-'))}
                          </Link>
                          <ExternalLink size={14} className="text-gray-400" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CV / Documents Preview Section */}
                {userData.cv?.url && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <FileText size={24} className="text-purple-600" /> Professional Documents
                    </h2>
                    <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-purple-50 flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
                        <FileType size={40} />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{userData.cv.fileName || "Curriculum Vitae"}</h3>
                        <p className="text-gray-500 text-sm mb-4">Official PDF Document • {userData.cv.uploadedAt || "Recent Upload"}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                          <button 
                            onClick={() => window.open(getFullUrl(userData.cv.url), '_blank')}
                            className="px-6 py-2 btn-primary text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
                          >
                            <Eye size={16} /> View in New Tab
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Education */}
                {(userData.education || []).length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <GraduationCap size={24} className="text-purple-600" /> Education
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {userData.education.map((e, i) => (
                        <div key={i} className="glass-card rounded-2xl p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <School size={18} className="text-purple-600" />
                            </div>
                            <div className="flex-1 text-sm">
                              <h3 className="font-bold text-gray-900">{e.degree}</h3>
                              <p className="text-gray-600 text-xs">{e.institution}</p>
                              <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                                <Calendar size={12} /> {e.year}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {(userData.experience || []).length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Briefcase size={24} className="text-purple-600" /> Experience
                    </h2>
                    <div className="space-y-4">
                      {userData.experience.map((e, i) => (
                        <div key={i} className="glass-card rounded-2xl p-6 text-sm">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                              <Building size={18} className="text-violet-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900">{e.position}</h3>
                              <p className="text-gray-600 text-xs">{e.company}</p>
                              <p className="text-gray-500 text-xs flex items-center gap-1 my-2">
                                <CalendarRange size={12} /> {e.duration}
                              </p>
                              <p className="text-gray-700 text-xs">{e.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {(userData.projects || []).length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Target size={24} className="text-purple-600" /> Projects
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userData.projects.map((p, i) => (
                        <div key={i} className="glass-card rounded-2xl p-6">
                          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center mb-3">
                            <Trophy size={18} className="text-pink-600" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-sm">{p.title}</h3>
                          <p className="text-gray-700 text-xs">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-purple-100/30 p-4 text-center border-t border-purple-100 text-sm">
                <p className="text-purple-600 font-semibold">✨ Made with Docify • {userData.stats?.lastUpdated ? new Date(userData.stats.lastUpdated).toLocaleDateString() : "Just now"}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;