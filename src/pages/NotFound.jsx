import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="text-[12rem] font-bold text-white/5 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaExclamationTriangle className="text-7xl text-cyan-400 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Oops! Page Not Found</h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          The page you're looking for was moved, removed, or never existed in the first place. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all transform hover:scale-105"
          >
            <FaHome /> Back to Home
          </Link>
          <Link 
            to="/showcase" 
            className="text-cyan-400 hover:text-white font-semibold transition-colors px-6"
          >
            Explore Showcase
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
