import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
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
      <div className="absolute bottom-20 text-center">
        <h2 className="text-white text-2xl font-bold mb-2">SkillSync Academy</h2>
        <p className="text-gray-400 text-sm">Loading your learning experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;