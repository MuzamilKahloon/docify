import { profileService } from '../services/api';

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // In a real scenario, this would be a public endpoint like getProfileByUsername
        const response = await profileService.getProfile(username);
        setUserData(response.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Profile not found");
        
        // Demo fallback: if backend is not up, try local storage
        const storedData = localStorage.getItem('docifyUser');
        if (storedData) {
          setUserData(JSON.parse(storedData));
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4 text-red-400">404</h1>
        <p className="text-xl text-slate-400">{error || "User not found"}</p>
        <a href="/" className="mt-8 text-cyan-400 hover:underline">Return Home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-200 pb-20 pt-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              {userData.profilePicture ? (
                <img 
                  src={userData.profilePicture} 
                  alt={userData.name} 
                  className="w-40 h-40 rounded-3xl object-cover border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                />
              ) : (
                <div className="w-40 h-40 rounded-3xl bg-slate-800 border-2 border-cyan-400/30 flex items-center justify-center">
                  <FaUser className="text-5xl text-slate-600" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{userData.name}</h1>
              <p className="text-xl text-cyan-400 font-medium mb-4">{userData.email}</p>
              <p className="text-slate-400 leading-relaxed max-w-2xl">
                {userData.bio}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-cyan-400/20 hover:text-cyan-400 transition-all border border-white/5">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-slate-100/20 hover:text-white transition-all border border-white/5">
                  <FaGithub size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-sky-400/20 hover:text-sky-400 transition-all border border-white/5">
                  <FaTwitter size={20} />
                </a>
                <a href={`mailto:${userData.email}`} className="p-3 bg-white/5 rounded-full hover:bg-orange-400/20 hover:text-orange-400 transition-all border border-white/5">
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block shrink-0">
              {userData.cv && userData.cv.url && (
                <a 
                  href={userData.cv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-cyan-400/10 border border-cyan-400/20 rounded-3xl hover:bg-cyan-400/20 transition-all group"
                >
                  <FaFilePdf className="text-4xl text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Download CV</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Skills Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <FaCode className="mr-3 text-cyan-400" /> Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl text-sm font-medium hover:border-cyan-400/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile CV Button */}
            <div className="lg:hidden">
              {userData.cv && userData.cv.url && (
                <a 
                  href={userData.cv.url}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold hover:bg-cyan-600 transition-all"
                >
                  <FaDownload /> Download Resume
                </a>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <FaBriefcase className="mr-4 text-cyan-400" /> Experience
              </h3>
              <div className="space-y-8">
                {userData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-8 border-l-2 border-cyan-400/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                    <div className="mb-2">
                      <h4 className="text-xl font-bold text-white">{exp.position}</h4>
                      <p className="text-cyan-400 font-medium">{exp.company}</p>
                      <p className="text-slate-500 text-sm mt-1">{exp.duration}</p>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <FaGraduationCap className="mr-4 text-cyan-400" /> Education
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.education.map((edu) => (
                  <div key={edu.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-400/20 transition-all">
                    <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                    <p className="text-cyan-400 text-sm font-medium mb-2">{edu.institution}</p>
                    <p className="text-slate-500 text-xs">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <FaCode className="mr-4 text-cyan-400" /> Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.projects.map((project) => (
                  <div key={project.id} className="group p-6 bg-slate-800/30 border border-white/5 rounded-2xl hover:bg-slate-800/50 hover:border-cyan-400/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                      <FaExternalLinkAlt className="text-slate-600 group-hover:text-cyan-400 transition-colors" size={14} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
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
