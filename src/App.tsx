import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import OnboardingChatbot from './components/OnboardingChatbot';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Resources from './pages/Resources';
import BeforeHackathon from './pages/BeforeHackathon';
import Events from './pages/Events';
import News from './pages/News';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/before-hackathon" element={<BeforeHackathon />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
          <OnboardingChatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;