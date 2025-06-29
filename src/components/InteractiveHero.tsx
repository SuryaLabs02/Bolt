import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Sparkles, Code, Cpu, Database, Mail, Lock, User, Eye, EyeOff, AlertCircle, ExternalLink, BookOpen, Star, Users, Award, Home, GraduationCap, Calendar, Newspaper, Menu, X, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MousePosition {
  x: number;
  y: number;
}

const InteractiveHero: React.FC = () => {
  const { isAuthenticated, signInWithGoogle, signInWithEmail, signUpWithEmail, isFirebaseReady } = useAuth();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showPopupHelp, setShowPopupHelp] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [showExploreSignIn, setShowExploreSignIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFirebaseSetup, setShowFirebaseSetup] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Courses', href: '/courses', icon: GraduationCap },
    { name: 'Resources', href: '/resources', icon: ExternalLink },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  useEffect(() => {
    // Check if running in iframe
    setIsInIframe(window !== window.top);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Handle modal visibility with proper animation timing
  useEffect(() => {
    if (showSignIn || showExploreSignIn || showFirebaseSetup) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setModalVisible(true), 50);
    } else {
      setModalVisible(false);
    }
  }, [showSignIn, showExploreSignIn, showFirebaseSetup]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // If already authenticated, go to dashboard with animation
      setIsLoading(true);
      setLoadingProgress(0);
      
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsLoading(false);
              window.location.href = '/dashboard';
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 150);
    } else {
      // Check if Firebase is configured
      if (!isFirebaseReady) {
        setShowFirebaseSetup(true);
        return;
      }
      
      // Show sign-in screen
      setShowSignIn(true);
      setAuthError(null);
      setShowPopupHelp(false);
      setIsRedirecting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Check Firebase configuration first
    if (!isFirebaseReady) {
      setAuthError('Firebase is not properly configured. Please set up your Firebase project first.');
      setShowFirebaseSetup(true);
      return;
    }

    // If in iframe, show special message
    if (isInIframe) {
      setAuthError('Google sign-in doesn\'t work in preview mode. Please click "Open in New Tab" above to test authentication features.');
      setShowPopupHelp(true);
      return;
    }

    try {
      setAuthError(null);
      setShowPopupHelp(false);
      setIsRedirecting(false);
      setIsLoading(true);
      setLoadingProgress(0);
      
      // Start progress animation
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90; // Stop at 90% until auth completes
          }
          return prev + Math.random() * 10 + 5;
        });
      }, 200);

      await signInWithGoogle();
      
      // If we reach here, authentication was successful
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setShowSignIn(false);
        setShowExploreSignIn(false);
        // Redirect to dashboard after successful sign-in
        window.location.href = '/dashboard';
      }, 1000);
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Check if this is a redirect in progress (not an actual error)
      if (error.message && error.message.includes('redirect')) {
        setIsRedirecting(true);
        setAuthError('Redirecting to Google sign-in...');
        // Don't stop loading as redirect is happening
        return;
      }
      
      // Handle actual errors
      if (error.message && error.message.includes('popup')) {
        setAuthError('Pop-up blocked! We\'re trying to redirect you to Google sign-in. If this doesn\'t work, please allow pop-ups for this site or use email sign-in instead.');
        setShowPopupHelp(true);
      } else if (error.message && error.message.includes('Firebase configuration')) {
        setAuthError('Firebase is not properly configured. Please set up your Firebase project.');
        setShowFirebaseSetup(true);
      } else {
        setAuthError(error.message || 'Google sign-in failed. Please try email sign-in or contact support.');
      }
      
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check Firebase configuration first
    if (!isFirebaseReady) {
      setAuthError('Firebase is not properly configured. Please set up your Firebase project first.');
      setShowFirebaseSetup(true);
      return;
    }
    
    if (!formData.email || !formData.password) {
      setAuthError('Please fill in all required fields');
      return;
    }

    if (authMode === 'signup' && !formData.name) {
      setAuthError('Please enter your name');
      return;
    }

    try {
      setAuthError(null);
      setShowPopupHelp(false);
      setIsRedirecting(false);
      setIsLoading(true);
      setLoadingProgress(0);
      
      // Start progress animation
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10 + 5;
        });
      }, 200);

      if (authMode === 'signin') {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.name);
      }
      
      // Complete progress
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setShowSignIn(false);
        setShowExploreSignIn(false);
        setFormData({ email: '', password: '', name: '' });
        // Redirect to dashboard after successful sign-in
        window.location.href = '/dashboard';
      }, 1000);
      
    } catch (error: any) {
      console.error('Email auth error:', error);
      
      if (error.message && error.message.includes('Firebase configuration')) {
        setAuthError('Firebase is not properly configured. Please set up your Firebase project.');
        setShowFirebaseSetup(true);
      } else {
        setAuthError(error.message || `Failed to ${authMode === 'signin' ? 'sign in' : 'sign up'}. Please try again.`);
      }
      
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const handleLetsStudy = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Exactly 5 seconds animation
    const totalDuration = 5000; // 5 seconds
    const intervalTime = 50; // Update every 50ms
    const totalSteps = totalDuration / intervalTime;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / totalSteps) * 100;
      
      setLoadingProgress(progress);
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          
          // Check if user is authenticated
          if (isAuthenticated) {
            // If authenticated, go to courses
            window.location.href = '/courses';
          } else {
            // If not authenticated, show sign-in popup
            if (!isFirebaseReady) {
              setShowFirebaseSetup(true);
            } else {
              setShowExploreSignIn(true);
              setAuthError(null);
              setShowPopupHelp(false);
              setIsRedirecting(false);
            }
          }
        }, 500);
      }
    }, intervalTime);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setShowSignIn(false);
      setShowExploreSignIn(false);
      setShowFirebaseSetup(false);
      setAuthError(null);
      setShowPopupHelp(false);
      setIsRedirecting(false);
    }, 300); // Wait for animation to complete
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const floatingIcons = [
    { Icon: Code, delay: 0, x: 10, y: 20 },
    { Icon: Cpu, delay: 1, x: 85, y: 15 },
    { Icon: Database, delay: 2, x: 15, y: 75 },
    { Icon: Sparkles, delay: 0.5, x: 80, y: 70 },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'All Courses in One Place',
      description: 'Comprehensive learning platform with every technology course you need',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Live Events & Updates',
      description: 'Real-time workshops, webinars, and latest tech industry information',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Complete Hackathon Experience',
      description: 'Join exciting hackathons and coding competitions worldwide',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { number: '50+', label: 'Tech Domains', icon: '🎯' },
    { number: '10K+', label: 'Students', icon: '👥' },
    { number: '24/7', label: 'Support', icon: '🚀' }
  ];

  return (
    <>
      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(139, 92, 246, 0.3) 0%, 
              rgba(59, 130, 246, 0.2) 25%, 
              rgba(16, 185, 129, 0.1) 50%, 
              transparent 70%),
            linear-gradient(135deg, 
              #0f172a 0%, 
              #581c87 25%, 
              #1e1b4b 50%, 
              #0f172a 75%, 
              #164e63 100%)
          `,
          transition: 'background 0.3s ease-out'
        }}
      >
        {/* Firebase Configuration Warning */}
        {!isFirebaseReady && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Firebase setup required for authentication</span>
              <button 
                onClick={() => setShowFirebaseSetup(true)}
                className="text-orange-200 hover:text-white underline text-sm"
              >
                Setup Guide
              </button>
            </div>
          </div>
        )}

        {/* Iframe Notice */}
        {isInIframe && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50" style={{ marginTop: !isFirebaseReady ? '3rem' : '0' }}>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">For full functionality, </span>
              <button 
                onClick={openInNewTab}
                className="text-blue-200 hover:text-white underline text-sm flex items-center space-x-1"
              >
                <span>open in new tab</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Header */}
        <header className="absolute top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SkillSync Academy</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'text-primary-300 bg-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bolt Badge - Larger Size */}
              <div className="hidden md:flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <img 
                  src="/black_circle_360x360.png" 
                  alt="Made with Bolt" 
                  className="w-8 h-8 opacity-90"
                />
                <span className="text-white/90 text-sm font-medium">Made with Bolt</span>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-white/10">
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                          location.pathname === item.href
                            ? 'text-primary-300 bg-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
                
                {/* Mobile Bolt Badge */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 px-3">
                    <img 
                      src="/black_circle_360x360.png" 
                      alt="Made with Bolt" 
                      className="w-6 h-6 opacity-80"
                    />
                    <span className="text-white/80 text-sm">Made with Bolt</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
              }}
            />
          ))}

          {/* Floating Tech Icons */}
          {floatingIcons.map(({ Icon, delay, x, y }, index) => (
            <div
              key={index}
              className="absolute opacity-10 text-white animate-bounce"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${delay}s`,
                animationDuration: '3s',
                transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <Icon className="h-12 w-12 md:h-16 md:w-16" />
            </div>
          ))}

          {/* Dynamic Gradient Orbs */}
          <div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
              left: `${mousePosition.x * 0.8}%`,
              top: `${mousePosition.y * 0.8}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.5s ease-out'
            }}
          />
          <div
            className="absolute w-64 h-64 rounded-full opacity-15 blur-2xl"
            style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              left: `${100 - mousePosition.x * 0.6}%`,
              top: `${100 - mousePosition.y * 0.6}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.4s ease-out'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-6xl mx-auto">
            {/* Main Heading */}
            <div className="mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                Master
                <span 
                  className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse"
                  style={{
                    filter: `hue-rotate(${mousePosition.x * 3.6}deg)`,
                    transition: 'filter 0.3s ease-out'
                  }}
                >
                  Every Tech
                </span>
                <span className="block text-white">Domain</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                Transform your career with comprehensive tech education. From AI and programming to cybersecurity and blockchain - master the skills that matter.
              </p>
              
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Join thousands of students building their future with hands-on projects, expert mentorship, and real-world experience.
              </p>
            </div>

            {/* Interactive Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto animate-slide-up">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                  style={{
                    transform: `translateY(${Math.sin((mousePosition.x + mousePosition.y + index * 30) * 0.01) * 5}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto animate-slide-up">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up mb-12">
              <button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 min-w-[220px]"
                style={{
                  boxShadow: `0 10px 30px rgba(139, 92, 246, ${0.3 + mousePosition.y * 0.003})`
                }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Learning Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>

              <button
                onClick={handleLetsStudy}
                className="group relative px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 min-w-[220px]"
                style={{
                  borderColor: `rgba(255, 255, 255, ${0.8 + mousePosition.x * 0.002})`,
                  boxShadow: `0 10px 30px rgba(255, 255, 255, ${0.1 + mousePosition.x * 0.002})`
                }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span>Explore Courses</span>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="animate-fade-in">
              <p className="text-gray-400 text-sm mb-6">Trusted by students worldwide • Join the tech revolution</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Modal Backdrop */}
      {(showFirebaseSetup || showSignIn || showExploreSignIn) && (
        <div 
          className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${
            modalVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          {/* Firebase Setup Modal */}
          {showFirebaseSetup && (
            <div 
              className={`bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
                modalVisible 
                  ? 'scale-100 opacity-100 translate-y-0' 
                  : 'scale-95 opacity-0 translate-y-4'
              }`}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Firebase Setup Required
                </h2>
                <p className="text-gray-600">
                  To enable authentication features, you need to configure Firebase
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Setup Steps:</h3>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Firebase Console</a></li>
                    <li>Create a new project or select an existing one</li>
                    <li>Enable Authentication → Sign-in method → Email/Password and Google</li>
                    <li>Go to Project Settings → General → Your apps</li>
                    <li>Add a web app and copy the configuration</li>
                    <li>Update your <code className="bg-blue-100 px-1 rounded">.env</code> file with the values</li>
                  </ol>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Environment Variables Needed:</h3>
                  <pre className="text-xs text-gray-700 bg-white p-3 rounded border overflow-x-auto">
{`VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/`}
                  </pre>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important:</h3>
                  <p className="text-sm text-yellow-800">
                    After updating your <code className="bg-yellow-100 px-1 rounded">.env</code> file, 
                    restart your development server for the changes to take effect.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Close
                </button>
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Open Firebase Console</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {/* Sign In Modal (Regular) */}
          {showSignIn && (
            <div 
              className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
                modalVisible 
                  ? 'scale-100 opacity-100 translate-y-0' 
                  : 'scale-95 opacity-0 translate-y-4'
              }`}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {authMode === 'signin' ? 'Welcome Back!' : 'Join SkillSync Academy'}
                </h2>
                <p className="text-gray-600">
                  {authMode === 'signin' ? 'Sign in to continue your learning journey' : 'Create your account to get started'}
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm">{authError}</p>
                  </div>
                </div>
              )}

              {/* Iframe Notice */}
              {isInIframe && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Preview Mode Limitation</h4>
                      <p className="text-blue-800 text-sm mb-2">
                        Google sign-in doesn't work in Bolt's preview mode due to iframe restrictions.
                      </p>
                      <button 
                        onClick={openInNewTab}
                        className="text-blue-600 hover:text-blue-700 underline text-sm flex items-center space-x-1"
                      >
                        <span>Open in new tab to test authentication</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Redirect Status */}
              {isRedirecting && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-blue-600 text-sm">Redirecting to Google sign-in...</p>
                  </div>
                </div>
              )}

              {/* Pop-up Help Section */}
              {showPopupHelp && !isInIframe && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">How to allow pop-ups:</h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Look for a pop-up blocked icon in your browser's address bar</li>
                    <li>Click on it and select "Always allow pop-ups from this site"</li>
                    <li>Refresh the page and try Google sign-in again</li>
                    <li>Or use email sign-in below as an alternative</li>
                  </ol>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4 mb-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required={authMode === 'signup'}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Please wait...' : (authMode === 'signin' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading || isRedirecting}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-3 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRedirecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Toggle Auth Mode */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setAuthError(null);
                    setShowPopupHelp(false);
                    setIsRedirecting(false);
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  disabled={isLoading || isRedirecting}
                  className="text-purple-600 hover:text-purple-700 text-sm transition-colors disabled:opacity-50"
                >
                  {authMode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={closeModal}
                  disabled={isLoading || isRedirecting}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          )}

          {/* Explore Courses Sign In Modal */}
          {showExploreSignIn && (
            <div 
              className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
                modalVisible 
                  ? 'scale-100 opacity-100 translate-y-0' 
                  : 'scale-95 opacity-0 translate-y-4'
              }`}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Explore Courses?
                </h2>
                <p className="text-gray-600">
                  Sign in to access our full course library and track your progress
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm">{authError}</p>
                  </div>
                </div>
              )}

              {/* Iframe Notice */}
              {isInIframe && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Preview Mode Limitation</h4>
                      <p className="text-blue-800 text-sm mb-2">
                        Google sign-in doesn't work in Bolt's preview mode due to iframe restrictions.
                      </p>
                      <button 
                        onClick={openInNewTab}
                        className="text-blue-600 hover:text-blue-700 underline text-sm flex items-center space-x-1"
                      >
                        <span>Open in new tab to test authentication</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Sign In with Google */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading || isRedirecting}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-4 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRedirecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-lg">Continue with Google</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or use email</span>
                </div>
              </div>

              {/* Quick Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4 mb-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing In...' : 'Sign In & Explore Courses'}
                </button>
              </form>

              {/* Toggle to Sign Up */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowExploreSignIn(false);
                    setShowSignIn(true);
                    setAuthError(null);
                    setShowPopupHelp(false);
                    setIsRedirecting(false);
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  disabled={isLoading || isRedirecting}
                  className="text-green-600 hover:text-green-700 text-sm transition-colors disabled:opacity-50"
                >
                  Don't have an account? Sign up
                </button>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => {
                    closeModal();
                    // Go to courses page without authentication
                    window.location.href = '/courses';
                  }}
                  disabled={isLoading || isRedirecting}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors disabled:opacity-50"
                >
                  Browse without signing in
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                Sign in to save progress and access personalized features
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Screen Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            {/* Animated Logo */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-spin" />
                <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Preparing Your Journey</h2>
              <p className="text-gray-400">Setting up your personalized learning experience...</p>
            </div>

            {/* Progress Bar */}
            <div className="w-80 max-w-sm mx-auto">
              <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Loading...</span>
                <span>{Math.round(loadingProgress)}%</span>
              </div>
            </div>

            {/* Loading Steps */}
            <div className="mt-8 space-y-2">
              {[
                { step: 'Initializing platform', threshold: 20 },
                { step: 'Loading course content', threshold: 50 },
                { step: 'Personalizing experience', threshold: 80 },
                { step: 'Almost ready!', threshold: 95 }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`text-sm transition-all duration-300 ${
                    loadingProgress >= item.threshold 
                      ? 'text-green-400 opacity-100' 
                      : 'text-gray-500 opacity-50'
                  }`}
                >
                  {loadingProgress >= item.threshold && '✓ '}{item.step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveHero;