import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import StudyAssistantChatbot from './components/StudyAssistantChatbot';
import OnboardingChatbot from './components/OnboardingChatbot';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import YouTubeCourses from './pages/YouTubeCourses';
import Events from './pages/Events';
import Hackathons from './pages/Hackathons';
import News from './pages/News';
import Profile from './pages/Profile';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMainApp, setShowMainApp] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowMainApp(true);
    }, 200);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div 
      className={`transition-all duration-1500 ease-out transform-gpu ${
        showMainApp 
          ? 'scale-100 opacity-100 rotate-0 blur-0' 
          : 'scale-75 opacity-0 rotate-2 blur-md'
      }`}
      style={{
        transformOrigin: 'center center',
        perspective: '1000px'
      }}
    >
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/youtube-courses" element={<YouTubeCourses />} />
                <Route path="/events" element={<Events />} />
                <Route path="/hackathons" element={<Hackathons />} />
                <Route path="/news" element={<News />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
            <StudyAssistantChatbot />
            <OnboardingChatbot />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;