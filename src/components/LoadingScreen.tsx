import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isExploding, setIsExploding] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  useEffect(() => {
    // Start particle explosion 500ms before loading completes
    const explosionTimer = setTimeout(() => {
      setIsExploding(true);
      generateParticles();
    }, 4500); // 4.5 seconds

    // Complete loading after explosion animation
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 5500); // 5.5 seconds to allow for explosion animation

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  const generateParticles = () => {
    const newParticles = [];
    const colors = ['#ff0080', '#ff4080', '#ff8040', '#ffff00', '#80ff40', '#40ff80', '#00ffff', '#4080ff', '#8040ff'];
    
    // Generate 50 particles from the center
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 2 + Math.random() * 4;
      
      newParticles.push({
        id: i,
        x: 50, // Start from center (50% of screen)
        y: 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    
    setParticles(newParticles);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Particle System */}
      {isExploding && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: particle.color,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `rotate(${particle.rotation}deg)`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                animation: `particleFloat 1s ease-out forwards`,
                animationDelay: `${Math.random() * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Loading Animation Container */}
      <div 
        className={`transition-all duration-1000 ease-out ${
          isExploding 
            ? 'scale-150 opacity-0 rotate-180 blur-sm' 
            : 'scale-100 opacity-100 rotate-0 blur-0'
        }`}
      >
        <div id="loadingWave" className="flex gap-4 perspective-[80px] transform-style-preserve-3d">
          <div className="shape square w-8 h-8 bg-[#ff0080] rounded-[4px] relative inline-block animate-shapeWave transform-origin-center transform-style-preserve-3d"></div>
          <div className="shape triangle w-0 h-0 border-l-4 border-r-4 border-b-7 border-l-transparent border-r-transparent border-b-[#ff0080] bg-transparent relative inline-block animate-triangleWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.1s' }}></div>
          <div className="shape diamond w-6 h-6 bg-[#ff0080] transform rotate-45 m-1 relative inline-block animate-shapeWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.2s' }}></div>
          <div className="shape circle w-8 h-8 bg-[#ff0080] rounded-full relative inline-block animate-shapeWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.3s' }}></div>
          <div className="shape square w-8 h-8 bg-[#ff0080] rounded-[4px] relative inline-block animate-shapeWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.4s' }}></div>
          <div className="shape triangle w-0 h-0 border-l-4 border-r-4 border-b-7 border-l-transparent border-r-transparent border-b-[#ff0080] bg-transparent relative inline-block animate-triangleWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.5s' }}></div>
          <div className="shape diamond w-6 h-6 bg-[#ff0080] transform rotate-45 m-1 relative inline-block animate-shapeWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.6s' }}></div>
          <div className="shape circle w-8 h-8 bg-[#ff0080] rounded-full relative inline-block animate-shapeWave transform-origin-center transform-style-preserve-3d" style={{ animationDelay: '0.7s' }}></div>
        </div>
        
        {/* Loading Text */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-white text-2xl font-bold mb-2">SkillSync Academy</h2>
          <p className="text-gray-400 text-sm">Loading your learning experience...</p>
        </div>
      </div>

      {/* Radial Burst Effect */}
      {isExploding && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-25" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.3s' }}></div>
        </div>
      )}

      {/* Screen Crack Effect */}
      {isExploding && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="crackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff0080" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* Animated crack lines */}
            <path
              d="M50,50 L20,20 M50,50 L80,20 M50,50 L20,80 M50,50 L80,80 M50,50 L10,50 M50,50 L90,50 M50,50 L50,10 M50,50 L50,90"
              stroke="url(#crackGradient)"
              strokeWidth="0.5"
              fill="none"
              className="animate-pulse"
              style={{
                animation: 'crackExpand 0.8s ease-out forwards',
                strokeDasharray: '100',
                strokeDashoffset: '100',
              }}
            />
          </svg>
        </div>
      )}

      {/* Vortex Background Effect */}
      {isExploding && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-0"
          style={{
            animation: 'vortexReveal 1s ease-out 0.5s forwards',
          }}
        />
      )}
    </div>
  );
};

export default LoadingScreen;