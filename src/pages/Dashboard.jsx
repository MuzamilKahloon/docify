import { useState, useEffect } from 'react';
import { 
  FaUser, FaFilePdf, FaDownload, FaEdit, FaTrash, FaPlus, 
  FaGraduationCap, FaBriefcase, FaCode, FaLinkedin, FaGithub, FaTwitter,
  FaChartLine, FaShieldAlt, FaPrint, FaUpload, FaCheck, FaTimes,
  FaSave, FaUserPlus
} from 'react-icons/fa';

const Dashboard = () => {
  // User data state
  const [userData, setUserData] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [cvUploadError, setCvUploadError] = useState("");
  const [activeTab, ] = useState("profile");
  const [isEditing, setIsEditing] = useState({
    education: null,
    experience: null,
    project: null
  });

  // Initialize user data
  useEffect(() => {
    // Check if user exists (in a real app, this would be an API call)
    const existingUser = localStorage.getItem('docifyUser');
    
    if (existingUser) {
      setUserData(JSON.parse(existingUser));
      setTempData(JSON.parse(existingUser));
    } else {
      setIsNewUser(true);
      setEditMode(true);
      initializeNewUser();
    }
  }, []);

  const initializeNewUser = () => {
    const newUserTemplate = {
      name: "",
      email: "",
      bio: "Tell us about yourself...",
      skills: [],
      education: [],
      experience: [],
      projects: [],
      profilePicture: "",
      cv: {
        name: "",
        url: "",
        uploadedAt: ""
      },
      stats: {
        profileViews: 0,
        cvDownloads: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };
    setUserData(newUserTemplate);
    setTempData(newUserTemplate);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array field changes
  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...tempData[field]];
    updatedArray[index] = {
      ...updatedArray[index],
      [key]: value
    };
    setTempData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  // Handle CV upload
  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setCvUploadError("");
        setCvFile(file);
        
        // Simulate upload process
        setTimeout(() => {
          const reader = new FileReader();
          reader.onload = (event) => {
            setTempData(prev => ({
              ...prev,
              cv: {
                name: file.name,
                url: event.target.result,
                uploadedAt: new Date().toISOString().split('T')[0]
              }
            }));
            setCvFile(null);
          };
          reader.readAsDataURL(file);
        }, 1500);
      } else {
        setCvUploadError("Only PDF files are allowed");
      }
    }
  };

  // Add new item to array
  const addNewItem = (field) => {
    const newItem = {
      id: Date.now(), // Temporary ID
      ...(field === 'education' ? {
        degree: "",
        institution: "",
        year: ""
      } : field === 'experience' ? {
        position: "",
        company: "",
        duration: "",
        description: ""
      } : {
        title: "",
        description: ""
      })
    };
    
    setTempData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }));
    setIsEditing(prev => ({...prev, [field]: newItem.id}));
  };

  // Remove item from array
  const removeItem = (field, id) => {
    setTempData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item.id !== id)
    }));
  };

  // Toggle item editing
  const toggleItemEditing = (field, id) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: prev[field] === id ? null : id
    }));
  };

  // Save profile
  const saveProfile = () => {
    setUserData(tempData);
    setEditMode(false);
    setIsNewUser(false);
    
    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem('docifyUser', JSON.stringify(tempData));
  };

  // Print portfolio
  const printPortfolio = () => {
    window.print();
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempData(prev => ({
          ...prev,
          profilePicture: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="animate-pulse text-white">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Dashboard Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-end items-center">
           
            <div className="flex items-center space-x-4">
              {editMode ? (
                <button 
                  onClick={saveProfile}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-md hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <FaSave className="mr-2" /> {isNewUser ? 'Create Profile' : 'Save Changes'}
                </button>
              ) : (
                <button 
                  onClick={() => setEditMode(true)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              )}
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <FaUser className="text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Picture & Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    {tempData.profilePicture ? (
                      <img 
                        src={tempData.profilePicture} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400/30"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-slate-700/50 border-4 border-cyan-400/30 flex items-center justify-center">
                        <FaUser className="text-4xl text-slate-400" />
                      </div>
                    )}
                    {editMode && (
                      <>
                        <label className="absolute bottom-0 right-0 bg-cyan-400 text-white p-2 rounded-full hover:bg-cyan-500 transition-colors cursor-pointer">
                          <FaUpload size={14} />
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleProfilePictureUpload}
                            className="hidden"
                          />
                        </label>
                        {tempData.profilePicture && (
                          <button 
                            onClick={() => setTempData(prev => ({...prev, profilePicture: ""}))}
                            className="absolute top-0 right-0 bg-red-400 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                          >
                            <FaTimes size={14} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={tempData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="text-center text-xl font-bold bg-white/5 border border-white/20 rounded-md px-3 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={tempData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="text-center text-white/70 bg-white/5 border border-white/20 rounded-md px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-center">{userData.name}</h2>
                      <p className="text-white/70 text-center">{userData.email}</p>
                    </>
                  )}
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium flex items-center">
                      <FaCode className="mr-2 text-cyan-400" /> Skills
                    </h3>
                    {editMode && (
                      <button 
                        onClick={() => {
                          const newSkills = [...tempData.skills, ""];
                          setTempData(prev => ({...prev, skills: newSkills}));
                        }}
                        className="text-cyan-400 hover:text-cyan-300 text-sm"
                      >
                        <FaPlus size={12} />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tempData.skills.map((skill, index) => (
                      editMode ? (
                        <div key={index} className="relative">
                          <input
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...tempData.skills];
                              newSkills[index] = e.target.value;
                              setTempData(prev => ({...prev, skills: newSkills}));
                            }}
                            className="bg-white/5 border border-white/20 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-6"
                          />
                          <button
                            onClick={() => {
                              const newSkills = [...tempData.skills];
                              newSkills.splice(index, 1);
                              setTempData(prev => ({...prev, skills: newSkills}));
                            }}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300"
                          >
                            <FaTimes size={10} />
                          </button>
                        </div>
                      ) : (
                        skill && (
                          <span key={index} className="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        )
                      )
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Bio</h3>
                  {editMode ? (
                    <textarea
                      name="bio"
                      value={tempData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-white/5 border border-white/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-white/80">{userData.bio}</p>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Social Links</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-white/70 hover:text-blue-400 transition-colors">
                      <FaLinkedin size={20} />
                    </a>
                    <a href="#" className="text-white/70 hover:text-white transition-colors">
                      <FaGithub size={20} />
                    </a>
                    <a href="#" className="text-white/70 hover:text-blue-400 transition-colors">
                      <FaTwitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Education, Experience, Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Education */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <FaGraduationCap className="mr-2 text-cyan-400" /> Education
                  </h3>
                  {editMode && (
                    <button 
                      onClick={() => addNewItem('education')}
                      className="flex items-center text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      <FaPlus className="mr-1" /> Add Education
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {tempData.education.length > 0 ? (
                    tempData.education.map((edu, index) => (
                      <div key={edu.id} className="border-l-4 border-cyan-400 pl-4 py-2 relative group">
                        {editMode && isEditing.education === edu.id ? (
                          <div className="space-y-3">
                            <input
                              value={edu.degree}
                              onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                              placeholder="Degree"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <input
                              value={edu.institution}
                              onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                              placeholder="Institution"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <input
                              value={edu.year}
                              onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                              placeholder="Year"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => toggleItemEditing('education', edu.id)}
                                className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-md text-sm hover:bg-cyan-400/20"
                              >
                                <FaCheck size={14} />
                              </button>
                              <button 
                                onClick={() => removeItem('education', edu.id)}
                                className="px-3 py-1 bg-red-400/10 text-red-400 rounded-md text-sm hover:bg-red-400/20"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-white/80">{edu.institution}</p>
                            <p className="text-white/60 text-sm">{edu.year}</p>
                            {editMode && (
                              <div className="absolute top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                                <button 
                                  onClick={() => toggleItemEditing('education', edu.id)}
                                  className="p-1 text-cyan-400 hover:text-cyan-300"
                                >
                                  <FaEdit size={14} />
                                </button>
                                <button 
                                  onClick={() => removeItem('education', edu.id)}
                                  className="p-1 text-red-400 hover:text-red-300"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-white/60">
                      {editMode ? (
                        <button 
                          onClick={() => addNewItem('education')}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          + Add your first education entry
                        </button>
                      ) : (
                        "No education added yet"
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <FaBriefcase className="mr-2 text-cyan-400" /> Experience
                  </h3>
                  {editMode && (
                    <button 
                      onClick={() => addNewItem('experience')}
                      className="flex items-center text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      <FaPlus className="mr-1" /> Add Experience
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {tempData.experience.length > 0 ? (
                    tempData.experience.map((exp, index) => (
                      <div key={exp.id} className="border-l-4 border-cyan-400 pl-4 py-2 relative group">
                        {editMode && isEditing.experience === exp.id ? (
                          <div className="space-y-3">
                            <input
                              value={exp.position}
                              onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                              placeholder="Position"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <input
                              value={exp.company}
                              onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                              placeholder="Company"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <input
                              value={exp.duration}
                              onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                              placeholder="Duration"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <textarea
                              value={exp.description}
                              onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                              placeholder="Description"
                              rows="2"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => toggleItemEditing('experience', exp.id)}
                                className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-md text-sm hover:bg-cyan-400/20"
                              >
                                <FaCheck size={14} />
                              </button>
                              <button 
                                onClick={() => removeItem('experience', exp.id)}
                                className="px-3 py-1 bg-red-400/10 text-red-400 rounded-md text-sm hover:bg-red-400/20"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h4 className="font-medium">{exp.position}</h4>
                            <p className="text-white/80">{exp.company}</p>
                            <p className="text-white/60 text-sm">{exp.duration}</p>
                            <p className="text-white/70 mt-1">{exp.description}</p>
                            {editMode && (
                              <div className="absolute top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                                <button 
                                  onClick={() => toggleItemEditing('experience', exp.id)}
                                  className="p-1 text-cyan-400 hover:text-cyan-300"
                                >
                                  <FaEdit size={14} />
                                </button>
                                <button 
                                  onClick={() => removeItem('experience', exp.id)}
                                  className="p-1 text-red-400 hover:text-red-300"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-white/60">
                      {editMode ? (
                        <button 
                          onClick={() => addNewItem('experience')}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          + Add your first work experience
                        </button>
                      ) : (
                        "No experience added yet"
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Projects</h3>
                  {editMode && (
                    <button 
                      onClick={() => addNewItem('projects')}
                      className="flex items-center text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      <FaPlus className="mr-1" /> Add Project
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {tempData.projects.length > 0 ? (
                    tempData.projects.map((project, index) => (
                      <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-400/30 transition-colors relative group">
                        {editMode && isEditing.project === project.id ? (
                          <div className="space-y-3">
                            <input
                              value={project.title}
                              onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                              placeholder="Project Title"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <textarea
                              value={project.description}
                              onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                              placeholder="Project Description"
                              rows="3"
                              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => toggleItemEditing('project', project.id)}
                                className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-md text-sm hover:bg-cyan-400/20"
                              >
                                <FaCheck size={14} />
                              </button>
                              <button 
                                onClick={() => removeItem('projects', project.id)}
                                className="px-3 py-1 bg-red-400/10 text-red-400 rounded-md text-sm hover:bg-red-400/20"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h4 className="font-medium mb-2">{project.title}</h4>
                            <p className="text-white/70 text-sm">{project.description}</p>
                            {editMode && (
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                                <button 
                                  onClick={() => toggleItemEditing('project', project.id)}
                                  className="p-1 text-cyan-400 hover:text-cyan-300 bg-white/10 rounded-full"
                                >
                                  <FaEdit size={12} />
                                </button>
                                <button 
                                  onClick={() => removeItem('projects', project.id)}
                                  className="p-1 text-red-400 hover:text-red-300 bg-white/10 rounded-full"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-white/60">
                      {editMode ? (
                        <button 
                          onClick={() => addNewItem('projects')}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          + Add your first project
                        </button>
                      ) : (
                        "No projects added yet"
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CV Management Tab */}
        {activeTab === "cv" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center">
                <FaFilePdf className="mr-2 text-cyan-400" /> CV Management
              </h2>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={printPortfolio}
                  className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors"
                >
                  <FaPrint className="mr-2" /> Print Portfolio
                </button>
                {tempData.cv.url && (
                  <button 
                    onClick={() => window.open(tempData.cv.url, '_blank')}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all"
                  >
                    <FaDownload className="mr-2" /> Download CV
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium">Upload New CV</h3>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors">
                  {cvFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mb-4">
                        <FaFilePdf className="text-cyan-400 text-2xl" />
                      </div>
                      <p className="font-medium mb-2">{cvFile.name}</p>
                      <div className="w-full bg-white/5 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" 
                          style={{ width: '70%' }}
                        ></div>
                      </div>
                      <p className="text-sm text-white/70">Uploading... 70%</p>
                    </div>
                  ) : (
                    <>
                      <FaUpload className="mx-auto text-cyan-400 text-3xl mb-4" />
                      <p className="text-white/80 mb-4">Drag & drop your CV here or click to browse</p>
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all inline-block">
                          Select PDF File
                        </span>
                        <input 
                          type="file" 
                          accept=".pdf" 
                          onChange={handleCvUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-white/50 mt-3">Only PDF files are accepted (max 5MB)</p>
                    </>
                  )}
                </div>
                {cvUploadError && (
                  <div className="text-red-400 text-sm mt-2">{cvUploadError}</div>
                )}
              </div>

              {/* Current CV */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium">Current CV</h3>
                {tempData.cv.url ? (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center mr-4">
                        <FaFilePdf className="text-cyan-400 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium">{tempData.cv.name}</h4>
                        <p className="text-white/60 text-sm">Uploaded: {tempData.cv.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => window.open(tempData.cv.url, '_blank')}
                        className="flex-1 flex items-center justify-center py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors"
                      >
                        <FaEye className="mr-2" /> Preview
                      </button>
                      <button 
                        onClick={() => window.open(tempData.cv.url, '_blank')}
                        className="flex-1 flex items-center justify-center py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors"
                      >
                        <FaDownload className="mr-2" /> Download
                      </button>
                    </div>
                    {editMode && (
                      <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
                        <button 
                          onClick={() => document.querySelector('input[type="file"]').click()}
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Replace CV
                        </button>
                        <button 
                          onClick={() => {
                            setTempData(prev => ({
                              ...prev,
                              cv: {
                                name: "",
                                url: "",
                                uploadedAt: ""
                              }
                            }));
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove CV
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center py-8">
                    <FaFilePdf className="mx-auto text-cyan-400 text-4xl mb-4" />
                    <p className="text-white/80 mb-4">No CV uploaded yet</p>
                    {editMode && (
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all inline-block">
                          Upload Your First CV
                        </span>
                        <input 
                          type="file" 
                          accept=".pdf" 
                          onChange={handleCvUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}

                {/* CV Tips */}
                <div className="bg-cyan-400/10 rounded-xl p-6 border border-cyan-400/20">
                  <h4 className="font-medium text-cyan-400 mb-3 flex items-center">
                    <FaShieldAlt className="mr-2" /> CV Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start">
                      <FaCheck className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                      <span>Keep your CV updated with recent experiences</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                      <span>Use a clean, professional format</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                      <span>Highlight key achievements and skills</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                      <span>Keep file size under 5MB for quick loading</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Preview Tab */}
        {activeTab === "preview" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg print:bg-white print:text-gray-800">
            <div className="flex justify-between items-center mb-8 print:hidden">
              <h2 className="text-2xl font-bold">Portfolio Preview</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={printPortfolio}
                  className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors"
                >
                  <FaPrint className="mr-2" /> Print
                </button>
                {userData.cv.url && (
                  <button 
                    onClick={() => window.open(userData.cv.url, '_blank')}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all"
                  >
                    <FaDownload className="mr-2" /> Download PDF
                  </button>
                )}
              </div>
            </div>

            {/* Portfolio Preview Content */}
            <div className="bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden print:shadow-none">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white print:break-after-avoid">
                <div className="flex flex-col md:flex-row items-center">
                  {userData.profilePicture ? (
                    <img 
                      src={userData.profilePicture} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4 md:mb-0 md:mr-6 print:border-gray-300"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white mb-4 md:mb-0 md:mr-6 flex items-center justify-center print:border-gray-300">
                      <FaUser className="text-4xl text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    <p className="text-xl opacity-90 mt-2">{userData.bio}</p>
                    <div className="flex space-x-4 mt-4">
                      <a href="#" className="text-white hover:text-white/80">
                        <FaLinkedin size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-white/80">
                        <FaGithub size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-white/80">
                        <FaTwitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8 print:p-6">
                <div className="grid md:grid-cols-3 gap-8 mb-8 print:grid-cols-3 print:gap-6 print:mb-6">
                  {/* Skills */}
                  <div className="print:break-inside-avoid">
                    <h2 className="text-xl font-bold text-cyan-600 mb-4 flex items-center print:text-gray-800">
                      <FaCode className="mr-2" /> Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.filter(skill => skill).map((skill, index) => (
                        <span key={index} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm print:bg-gray-100 print:text-gray-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="print:break-inside-avoid">
                    <h2 className="text-xl font-bold text-cyan-600 mb-4 print:text-gray-800">Contact</h2>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <FaEnvelope className="mr-2 text-cyan-500 print:text-gray-600" /> {userData.email || "Not provided"}
                      </p>
                      <p className="flex items-center">
                        <FaUser className="mr-2 text-cyan-500 print:text-gray-600" /> docify.com/{userData.name ? userData.name.toLowerCase().replace(' ', '-') : "profile"}
                      </p>
                    </div>
                  </div>

                  {/* CV Download */}
                  <div className="print:break-inside-avoid">
                    <h2 className="text-xl font-bold text-cyan-600 mb-4 print:text-gray-800">Curriculum Vitae</h2>
                    {userData.cv.url ? (
                      <button 
                        onClick={() => window.open(userData.cv.url, '_blank')}
                        className="flex items-center justify-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors print:hidden"
                      >
                        <FaDownload className="mr-2" /> Download CV
                      </button>
                    ) : (
                      <p className="text-gray-500 text-sm">No CV uploaded</p>
                    )}
                  </div>
                </div>

                {/* Education */}
                {userData.education.length > 0 && (
                  <div className="mb-8 print:mb-6 print:break-inside-avoid">
                    <h2 className="text-xl font-bold text-cyan-600 mb-4 flex items-center print:text-gray-800">
                      <FaGraduationCap className="mr-2" /> Education
                    </h2>
                    <div className="space-y-4">
                      {userData.education.map((edu, index) => (
                        <div key={index} className="border-l-4 border-cyan-500 pl-4 print:border-gray-300">
                          <h3 className="font-bold">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {userData.experience.length > 0 && (
                  <div className="mb-8 print:mb-6 print:break-inside-avoid">
                    <h2 className="text-xl font-bold text-cyan-600 mb-4 flex items-center print:text-gray-800">
                      <FaBriefcase className="mr-2" /> Experience
                    </h2>
                    <div className="space-y-4">
                      {userData.experience.map((exp, index) => (
                        <div key={index} className="border-l-4 border-cyan-500 pl-4 print:border-gray-300">
                          <h3 className="font-bold">{exp.position}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.duration}</p>
                          <p className="text-gray-600 mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {userData.projects.length > 0 && (
                  <div className="print:break-inside-avoid">
                    <h2 className="text-xl font-bold text-cyan-600 mb-4 print:text-gray-800">Projects</h2>
                    <div className="grid md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
                      {userData.projects.map((project, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow print:shadow-none print:border-gray-200">
                          <h3 className="font-bold text-gray-800">{project.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-100 p-4 text-center text-gray-500 text-sm print:bg-transparent">
                Generated by Docify • Last updated: {userData.stats.lastUpdated}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-portfolio, .print-portfolio * {
            visibility: visible;
          }
          .print-portfolio {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;