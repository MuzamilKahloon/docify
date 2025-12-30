import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Profile from './pages/Profile'; 
import TemplatesPage from './pages/TemplatesPage';
import ShowcasePage from './pages/ShowcasePage';
import CommunityChat from './pages/CommunityChat';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import SupportWidget from './components/SupportWidget';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout component to conditionally render Navbar/Footer
const AppLayout = ({ user }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/dashboard'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar user={user} />}
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
          <Route path="/community" element={user ? <CommunityChat /> : <Navigate to="/login" state={{ from: '/community' }} />} />
          <Route path="/admin-dashboard" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" state={{ from: '/admin-dashboard' }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!shouldHideNavbar && <Footer />}
      {user && !user.isAdmin && <SupportWidget />}
    </div>
  );
};

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
      <AppLayout user={user} />
      <ToastContainer position="bottom-right" theme="colored" />
    </Router>
  );
};


export default App;

