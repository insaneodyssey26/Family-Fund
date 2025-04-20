import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import WelcomePopup from './components/WelcomePopup';
import ScrollProgressLine from './components/ScrollProgressLine';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ResourceDetail from './pages/ResourceDetail';
import RegisterResource from './pages/RegisterResource';
import Instructors from './pages/Instructors';
import InstructorDetail from './pages/InstructorDetail';
import CategoryResources from './pages/CategoryResources';
import styles from './styles/App.module.css';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <div className={styles.app}>
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          <ScrollProgressLine />
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <WelcomePopup />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:resourceId" element={<ResourceDetail />} />
              <Route path="/register-resource/:resourceId" element={<RegisterResource />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/instructors/:id" element={<InstructorDetail />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Navigate to="/signup" replace />} />
              <Route path="/category/:category" element={<CategoryResources />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
