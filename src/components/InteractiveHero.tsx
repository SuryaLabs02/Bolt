import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Sparkles, Code, Cpu, Database, Mail, Lock, User, Eye, EyeOff, AlertCircle, ExternalLink, BookOpen, Star, Users, Award, Home, GraduationCap, Calendar, Newspaper, Menu, X, Settings, Zap, TrendingUp, Rocket, Target, Hexagon } from 'lucide-react';
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
  const [currentCard, setCurrentCard] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Courses', href: '/courses', icon: GraduationCap },
    { name: 'YouTube Courses', href: '/youtube-courses', icon: ExternalLink },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  // Aurora animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'];
      
      for (let i = 0; i < 800; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 8 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.8
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Wave motion
        particle.x += Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.05;
        particle.y += Math.cos(Date.now() * 0.0015 + particle.x * 0.008) * 0.03;
        
        // Boundary check
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Fade based on distance from center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dist = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2);
        const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
        particle.alpha = Math.max(0, 0.8 - (dist / maxDist));
        
        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentCard(prev => prev === 4 ? 1 : prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

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

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const setActiveCard = (cardNumber: number) => {
    if (isAnimating || cardNumber === currentCard) return;
    
    setIsAnimating(true);
    setCurrentCard(cardNumber);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Card data
  const cards = [
    {
      id: 1,
      icon: TrendingUp,
      iconColor: 'text-orange-400',
      stage: 'Series A-C',
      aum: '$12.8B AUM',
      bgGradient: 'from-orange-500 to-red-600',
      letter: 'S',
      title: 'Sequoia Capital',
      location: 'Sand Hill Road, Menlo Park',
      companies: '9 funded',
      successRate: '89%',
      progressColor: 'from-orange-500 to-red-600',
      buttonText: 'View Portfolio Companies'
    },
    {
      id: 2,
      icon: Rocket,
      iconColor: 'text-purple-400',
      stage: 'Seed-Series B',
      aum: '$18.2B AUM',
      bgGradient: 'from-purple-600 to-blue-600',
      letter: 'a16z',
      title: 'Andreessen Horowitz',
      location: 'Sand Hill Road, Menlo Park',
      companies: '14 funded',
      successRate: '92%',
      progressColor: 'from-purple-600 to-blue-600',
      buttonText: 'Explore Investments'
    },
    {
      id: 3,
      icon: Target,
      iconColor: 'text-green-400',
      stage: 'Series A-D',
      aum: '$8.5B AUM',
      bgGradient: 'from-green-500 to-teal-600',
      letter: <Hexagon className="w-10 h-10 text-white" />,
      title: 'Founders Fund',
      location: 'San Francisco, CA',
      companies: '7 funded',
      successRate: '86%',
      progressColor: 'from-green-500 to-teal-600',
      buttonText: 'See Fund Portfolio'
    },
    {
      id: 4,
      icon: Zap,
      iconColor: 'text-orange-400',
      stage: 'Pre-Seed',
      aum: '$6.2B AUM',
      bgGradient: 'from-orange-500 to-yellow-500',
      letter: 'Y',
      title: 'Y Combinator',
      location: 'Mountain View, CA',
      companies: '23 funded',
      successRate: '78%',
      progressColor: 'from-orange-500 to-yellow-500',
      buttonText: 'View Accelerator Program'
    }
  ];

  return (
    <>
      {/* Aurora Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{ background: 'black' }}
      />

      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-black text-white font-inter selection:bg-white/10"
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <div className="w-8 h-8 flex bg-gradient-to-r from-red-400 to-orange-400 rounded-lg items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight">SkillSync Academy</span>
              </div>
              <div className="hidden md:flex items-center space-x-8 text-sm opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <a href="#" className="text-white/60 hover:text-white transition-colors">Portfolio</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">About</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10 min-h-screen flex pt-16 pr-6 pl-6 items-center justify-center">
          <div className="max-w-7xl w-full mr-auto ml-auto px-8 pt-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
              
              {/* Left Content */}
              <div className="flex-1 max-w-xl lg:pr-8">
                <div className="flex items-center space-x-2 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm uppercase tracking-widest text-white/60 font-medium">SkillSync Academy • Founded 2024 • 1000+ Students</p>
                </div>
                
                <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                  <h1 className="text-4xl lg:text-5xl xl:text-8xl font-medium leading-tight tracking-tighter mb-4">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                      Master Every
                    </span>
                    <span className="block bg-clip-text italic text-transparent font-serif bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                      Technology Domain
                    </span>
                  </h1>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Transform your career with comprehensive tech education. From AI and programming to cybersecurity and blockchain - master the skills that matter.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 text-sm text-white/60 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>50+ Technology domains covered</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Live events and workshops</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Global hackathon participation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Expert mentorship and guidance</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Card Stack + Navigation */}
              <div className="flex flex-col space-y-8 items-center">
                {/* Card Stack */}
                <section 
                  className={`card-${currentCard}-active`}
                  style={{ 
                    animationDelay: '0.7s', 
                    animationFillMode: 'forwards',
                    cursor: 'grab',
                    '--_offset-steps': '4rem',
                    '--_scale-steps': '12',
                    '--_opacity-steps': '15',
                    '--_offset-steps-two': 'calc(var(--_offset-steps) * -1)',
                    '--_offset-steps-three': 'calc(var(--_offset-steps) * -2)',
                    '--scale-steps-two': 'calc(1 - var(--_scale-steps) * 0.01)',
                    '--scale-steps-three': 'calc(1 - var(--_scale-steps) * 0.02)',
                    '--opacity-steps-two': 'calc(1 - var(--_opacity-steps) * 0.02)',
                    '--opacity-steps-three': 'calc(1 - var(--_opacity-steps) * 0.04)',
                    display: 'grid',
                    gridTemplateAreas: '"stack"',
                    width: 'min(calc(100% - 2rem), 32rem)',
                  } as React.CSSProperties}
                >
                  {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <article 
                        key={card.id}
                        className="relative h-[32rem] rounded-2xl shadow-2xl"
                        style={{
                          gridArea: 'stack',
                          transition: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
                          translate: `var(--_${card.id}-offset, 0) 0`,
                          order: `var(--_${card.id}-order, ${card.id})`,
                          zIndex: `var(--_${card.id}-order, ${card.id})`,
                          scale: `var(--_${card.id}-scale, 1)`,
                          opacity: `var(--_${card.id}-opacity, 1)`,
                          cursor: 'grab',
                          userSelect: 'none',
                          transformStyle: 'preserve-3d',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          width: '360px',
                          '--_1-order': currentCard === 1 ? '4' : currentCard === 2 ? '1' : currentCard === 3 ? '2' : '3',
                          '--_1-scale': currentCard === 1 ? '1' : currentCard === 2 ? 'calc(1 - var(--_scale-steps) * 0.03)' : currentCard === 3 ? 'var(--scale-steps-three)' : 'var(--scale-steps-two)',
                          '--_1-opacity': currentCard === 1 ? '1' : currentCard === 2 ? 'calc(1 - var(--_opacity-steps) * 0.06)' : currentCard === 3 ? 'var(--opacity-steps-three)' : 'var(--opacity-steps-two)',
                          '--_1-offset': currentCard === 1 ? '0' : currentCard === 2 ? 'calc(var(--_offset-steps) * -3)' : currentCard === 3 ? 'var(--_offset-steps-three)' : 'var(--_offset-steps-two)',
                          '--_2-order': currentCard === 2 ? '4' : currentCard === 3 ? '1' : currentCard === 4 ? '2' : currentCard === 1 ? '3' : '3',
                          '--_2-scale': currentCard === 2 ? '1' : currentCard === 3 ? 'calc(1 - var(--_scale-steps) * 0.03)' : currentCard === 4 ? 'var(--scale-steps-three)' : currentCard === 1 ? 'var(--scale-steps-two)' : 'var(--scale-steps-two)',
                          '--_2-opacity': currentCard === 2 ? '1' : currentCard === 3 ? 'calc(1 - var(--_opacity-steps) * 0.06)' : currentCard === 4 ? 'var(--opacity-steps-three)' : currentCard === 1 ? 'var(--opacity-steps-two)' : 'var(--opacity-steps-two)',
                          '--_2-offset': currentCard === 2 ? '0' : currentCard === 3 ? 'calc(var(--_offset-steps) * -3)' : currentCard === 4 ? 'var(--_offset-steps-three)' : currentCard === 1 ? 'var(--_offset-steps-two)' : 'var(--_offset-steps-two)',
                          '--_3-order': currentCard === 3 ? '4' : currentCard === 4 ? '1' : currentCard === 1 ? '2' : currentCard === 2 ? '3' : '3',
                          '--_3-scale': currentCard === 3 ? '1' : currentCard === 4 ? 'calc(1 - var(--_scale-steps) * 0.03)' : currentCard === 1 ? 'var(--scale-steps-three)' : currentCard === 2 ? 'var(--scale-steps-two)' : 'var(--scale-steps-two)',
                          '--_3-opacity': currentCard === 3 ? '1' : currentCard === 4 ? 'calc(1 - var(--_opacity-steps) * 0.06)' : currentCard === 1 ? 'var(--opacity-steps-three)' : currentCard === 2 ? 'var(--opacity-steps-two)' : 'var(--opacity-steps-two)',
                          '--_3-offset': currentCard === 3 ? '0' : currentCard === 4 ? 'calc(var(--_offset-steps) * -3)' : currentCard === 1 ? 'var(--_offset-steps-three)' : currentCard === 2 ? 'var(--_offset-steps-two)' : 'var(--_offset-steps-two)',
                          '--_4-order': currentCard === 4 ? '4' : currentCard === 1 ? '1' : currentCard === 2 ? '2' : currentCard === 3 ? '3' : '3',
                          '--_4-scale': currentCard === 4 ? '1' : currentCard === 1 ? 'calc(1 - var(--_scale-steps) * 0.03)' : currentCard === 2 ? 'var(--scale-steps-three)' : currentCard === 3 ? 'var(--scale-steps-two)' : 'var(--scale-steps-two)',
                          '--_4-opacity': currentCard === 4 ? '1' : currentCard === 1 ? 'calc(1 - var(--_opacity-steps) * 0.06)' : currentCard === 2 ? 'var(--opacity-steps-three)' : currentCard === 3 ? 'var(--opacity-steps-two)' : 'var(--opacity-steps-two)',
                          '--_4-offset': currentCard === 4 ? '0' : currentCard === 1 ? 'calc(var(--_offset-steps) * -3)' : currentCard === 2 ? 'var(--_offset-steps-three)' : currentCard === 3 ? 'var(--_offset-steps-two)' : 'var(--_offset-steps-two)',
                        } as React.CSSProperties}
                      >
                        <div className="h-full flex flex-col p-8">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-5 h-5 ${card.iconColor}`} />
                              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">{card.stage}</span>
                            </div>
                            <span className="text-sm font-bold text-green-400">{card.aum}</span>
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-center items-center text-center">
                            <div className={`w-20 h-20 bg-gradient-to-br ${card.bgGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                              {typeof card.letter === 'string' ? (
                                <span className="text-3xl font-bold text-white">{card.letter}</span>
                              ) : (
                                card.letter
                              )}
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight mb-2">{card.title}</h3>
                            <p className="text-sm text-white/60 mb-8">{card.location}</p>
                            
                            <div className="space-y-4 mb-8 w-full max-w-xs">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-white/60">Portfolio Companies</span>
                                <span className="font-semibold">{card.companies}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-white/60">Success Rate</span>
                                <span className="font-semibold text-green-400">{card.successRate}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className={`bg-gradient-to-r ${card.progressColor} h-2 rounded-full transition-all duration-500`}
                                  style={{ width: card.successRate }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleGetStarted}
                            className="w-full py-3 px-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300 font-medium"
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {card.buttonText}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </section>

                {/* Navigation Dots */}
                <div className="flex space-x-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                  {[1, 2, 3, 4].map((dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => setActiveCard(dotIndex)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentCard === dotIndex
                          ? 'bg-blue-400 scale-125'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="opacity-0 animate-fade-in text-center mt-16" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <div className="space-y-6">
                <h2 className="text-2xl font-medium text-white">Ready to Master Technology?</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Join thousands of students already learning and building their tech careers. 
                  From programming fundamentals to cutting-edge AI, accelerate your journey with expert guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={handleGetStarted}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start Learning Free
                  </button>
                  <button 
                    onClick={() => window.location.href = '/courses'}
                    className="px-8 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 font-medium"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Explore Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Moving Tech Logos Section */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm border-t border-white/10">
          <div className="relative overflow-hidden py-6">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
            
            {/* Moving Logos Container */}
            <div className="flex animate-scroll-right">
              {/* First Set */}
              <div className="flex items-center space-x-12 px-6">
                {[
                  { name: 'Stack Overflow', icon: '📚', status: 'active' },
                  { name: 'LeetCode', icon: '💻', status: 'active' },
                  { name: 'Kaggle', icon: '📊', status: 'active' },
                  { name: 'CodePen', icon: '✏️', status: 'active' },
                  { name: 'Discord', icon: '💬', status: 'active' },
                  { name: 'Slack', icon: '💼', status: 'active' },
                  { name: 'Figma', icon: '🎨', status: 'active' },
                  { name: 'YouTube', icon: '📺', status: 'active' },
                  { name: 'Devpost', icon: '🚀', status: 'active' },
                  { name: 'Hackathons', icon: '🏆', status: 'active' },
                  { name: 'Courses', icon: '📖', status: 'active' },
                  { name: 'GitHub', icon: '🐱', status: 'active' },
                ].map((platform, index) => (
                  <div 
                    key={`first-${index}`}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group min-w-max"
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                        {platform.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${platform.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="text-xs text-white/60">{platform.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Duplicate Set for Seamless Loop */}
              <div className="flex items-center space-x-12 px-6">
                {[
                  { name: 'Stack Overflow', icon: '📚', status: 'active' },
                  { name: 'LeetCode', icon: '💻', status: 'active' },
                  { name: 'Kaggle', icon: '📊', status: 'active' },
                  { name: 'CodePen', icon: '✏️', status: 'active' },
                  { name: 'Discord', icon: '💬', status: 'active' },
                  { name: 'Slack', icon: '💼', status: 'active' },
                  { name: 'Figma', icon: '🎨', status: 'active' },
                  { name: 'YouTube', icon: '📺', status: 'active' },
                  { name: 'Devpost', icon: '🚀', status: 'active' },
                  { name: 'Hackathons', icon: '🏆', status: 'active' },
                  { name: 'Courses', icon: '📖', status: 'active' },
                  { name: 'GitHub', icon: '🐱', status: 'active' },
                ].map((platform, index) => (
                  <div 
                    key={`second-${index}`}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group min-w-max"
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                        {platform.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${platform.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="text-xs text-white/60">{platform.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Subtitle */}
            <div className="text-center mt-4">
              <p className="text-white/60 text-sm flex items-center justify-center space-x-2">
                <span>🌍 Trusted by developers worldwide</span>
                <span>•</span>
                <span>🔥 Industry-leading platforms</span>
                <span>•</span>
                <span>💡 Learn from the best</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All the existing modals and components remain the same... */}
      {/* Firebase Setup Modal */}
      {showFirebaseSetup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
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
                onClick={() => setShowFirebaseSetup(false)}
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