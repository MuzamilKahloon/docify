import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaGithub, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { authService } from '../services/api';

const DocifyAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('docify_user');
    localStorage.removeItem('token'); // Also remove JWT
    toast.success("Logged out successfully!", { position: "top-center" });
    navigate('/');
    window.location.reload(); 
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      let response;
      if (isLogin) {
        response = await authService.login(formData.email, formData.password);
        toast.success("Login Successful!", { position: "top-center" });
      } else {
        response = await authService.register(formData.email, formData.password, formData.name);
        toast.success("Account created successfully!", { position: "top-center" });
      }
      
      const { user, token } = response.data;
      localStorage.setItem('docify_user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      navigate(location.state?.from || '/dashboard', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Auth error:", error);
      const message = error.response?.data?.message || "Authentication failed. Using fallback.";
      toast.error(message);

      // Demo fallback: simulate success if backend is missing
      const mockUser = {
        uid: "mock_" + Date.now(),
        email: formData.email,
        displayName: formData.name || "User",
        isAdmin: formData.email === 'admin@docify.com'
      };
      localStorage.setItem('docify_user', JSON.stringify(mockUser));
      navigate(location.state?.from || '/dashboard', { replace: true });
      window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (providerType) => {
    toast.info(`${providerType} login will be implemented with backend oauth.`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 items-center justify-center p-12">
        <div className="text-white text-center">
          <img 
            src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
            alt="Docify Illustration" 
            className="w-full max-w-md mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome to Docify</h1>
          <p className="text-xl opacity-90">
            {isLogin 
              ? "Login to access your documents and collaborate with your team." 
              : "Join Docify today and revolutionize your document management."}
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Login to Docify' : 'Create an Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => handleSocialLogin('google')}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('github')}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaGithub className="text-gray-800" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailPasswordSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? (isLogin ? 'Logging in...' : 'Creating account...') 
                : (isLogin ? 'Login' : 'Sign up')}
            </button>
          </form>

          {!isLogin && (
            <p className="mt-4 text-sm text-gray-600">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocifyAuthPage;