import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Profile from './pages/Profile'; 
import TemplatesPage from './pages/TemplatesPage';
import ShowcasePage from './pages/ShowcasePage';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session/token in localStorage
    const savedUser = localStorage.getItem('docify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" state={{ from: '/dashboard' }} />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/admin" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" state={{ from: '/admin' }} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

