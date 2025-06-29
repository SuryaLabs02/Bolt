import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowDown, Sparkles, Code, Cpu, Database, Globe, Rocket, Star } from 'lucide-react';

const AnimatedLandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; speed: number }>>([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
          speed: Math.random() * 2 + 0.5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        ...(particle.y < -10 && { y: window.innerHeight + 10, x: Math.random() * window.innerWidth })
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show content after animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToContent = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techIcons = [
    { icon: Code, color: 'text-blue-500', delay: '0s' },
    { icon: Cpu, color: 'text-purple-500', delay: '0.2s' },
    { icon: Database, color: 'text-green-500', delay: '0.4s' },
    { icon: Globe, color: 'text-orange-500', delay: '0.6s' },
    { icon: Rocket, color: 'text-red-500', delay: '0.8s' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-60 animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}

        {/* Interactive Mouse Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transition: 'all 0.1s ease-out',
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-blue-500/20 animate-pulse"
                style={{ animationDelay: `${(i % 12) * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        {/* Logo Animation */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full">
              <Sparkles className="h-16 w-16 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>

        {/* Main Title with Typewriter Effect */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent animate-fade-in">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>I</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>n</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>n</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>o</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>v</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>a</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>t</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>e</span>
            <span className="inline-block animate-bounce mx-4" style={{ animationDelay: '0.8s' }}>X</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.9s' }}>C</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '1s' }}>a</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '1.1s' }}>m</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '1.2s' }}>p</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '1.3s' }}>u</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '1.4s' }}>s</span>
          </h1>
          
          {/* Subtitle with Glow Effect */}
          <p className="text-xl md:text-2xl text-gray-300 animate-fade-in" style={{ animationDelay: '2s' }}>
            Master Every Technology Domain
          </p>
        </div>

        {/* Floating Tech Icons */}
        <div className="flex space-x-8 mb-12">
          {techIcons.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className={`${tech.color} animate-bounce`}
                style={{ animationDelay: tech.delay, animationDuration: '2s' }}
              >
                <Icon className="h-12 w-12 drop-shadow-lg" />
              </div>
            );
          })}
        </div>

        {/* Colorful Flowing Animation */}
        <div className="relative mb-12">
          <div className="flex space-x-4">
            {['🚀', '💻', '🔬', '🎯', '⚡', '🌟'].map((emoji, index) => (
              <div
                key={index}
                className="text-4xl animate-pulse"
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '2s'
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {showContent && (
          <div className="animate-fade-in" style={{ animationDelay: '3s' }}>
            <button
              onClick={handleScrollToContent}
              className="group flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors"
            >
              <span className="text-sm font-medium">Explore Platform</span>
              <div className="p-2 rounded-full border border-white/30 group-hover:border-white/60 transition-colors">
                <ArrowDown className="h-6 w-6 animate-bounce" />
              </div>
            </button>
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <Code className="h-10 w-10 text-blue-400 animate-pulse" />
        </div>
        <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: '2s' }}>
          <Cpu className="h-12 w-12 text-purple-400 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <Database className="h-8 w-8 text-green-400 animate-pulse" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLandingPage;