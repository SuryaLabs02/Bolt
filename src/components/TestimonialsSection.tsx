import React, { useState, useEffect, useRef } from 'react';
import { Star, Users, Calendar, ThumbsUp, Shield, Share, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  tags: string[];
  stats: {
    teamSize?: string;
    customerDuration?: string;
    helpful?: boolean;
    verified?: boolean;
    shared?: number;
    timeAgo?: string;
  };
  featured?: boolean;
}

const TestimonialsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'VP of Engineering',
      company: 'TechFlow',
      avatar: 'SM',
      content: 'SkillSync Academy has completely transformed how our team learns new technologies. The AI-powered course recommendations and hands-on projects provide exactly what we need to stay ahead in the rapidly evolving tech landscape.',
      rating: 5,
      tags: ['FEATURED', 'Enterprise', 'Verified'],
      stats: {
        teamSize: '200+ team',
        customerDuration: '2 years customer',
        verified: true
      },
      featured: true
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Product Manager',
      company: 'DataSync',
      avatar: 'MC',
      content: 'The real-time collaboration features and comprehensive course library are game-changing. Our remote team feels more connected than ever, and the platform\'s mobile experience is seamless across all devices.',
      rating: 5,
      tags: ['Startup', 'Mobile', 'Verified'],
      stats: {
        helpful: true,
        verified: true,
        timeAgo: '3 months ago'
      },
      featured: false
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      role: 'CTO',
      company: 'StartupFlow',
      avatar: 'AR',
      content: 'Incredible performance boost for our development team. The hackathon integration and YouTube course curation features are flawless. Support team is responsive and the feature roadmap aligns perfectly with our needs.',
      rating: 5,
      tags: ['Enterprise', 'API User', 'Verified'],
      stats: {
        shared: 8,
        timeAgo: '6 months ago',
        verified: true
      },
      featured: false
    }
  ];

  // Mouse tracking for dynamic background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveCard(prev => prev === 3 ? 1 : prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = currentX - startXRef.current;
    
    if (Math.abs(diff) > 10) {
      setDragDirection(diff > 0 ? 'right' : 'left');
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    
    if (Math.abs(diff) > 10) {
      setDragDirection(diff > 0 ? 'right' : 'left');
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    if (dragDirection === 'right') {
      setActiveCard(prev => prev === 1 ? 3 : prev - 1);
    } else if (dragDirection === 'left') {
      setActiveCard(prev => prev === 3 ? 1 : prev + 1);
    }
    
    setIsDragging(false);
    setDragDirection(null);
  };

  const navigateToCard = (cardId: number) => {
    setActiveCard(cardId);
  };

  const getAvatarGradient = (id: number) => {
    const gradients = [
      'from-purple-400 via-pink-400 to-cyan-400',
      'from-green-400 via-blue-400 to-purple-400',
      'from-orange-400 via-red-400 to-pink-400'
    ];
    return gradients[(id - 1) % gradients.length];
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'featured':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'enterprise':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'verified':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'startup':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      case 'mobile':
        return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
      case 'api user':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.15) 0%, 
            rgba(59, 130, 246, 0.1) 25%, 
            rgba(16, 185, 129, 0.05) 50%, 
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`
            }}
          />
        ))}

        {/* Dynamic Gradient Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.8}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s ease-out'
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-8 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            left: `${100 - mousePosition.x * 0.6}%`,
            top: `${100 - mousePosition.y * 0.6}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.4s ease-out'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers, engineers, and tech professionals who have transformed their careers with SkillSync Academy
          </p>
        </div>

        {/* Interactive Testimonials Stack */}
        <div className="relative max-w-2xl mx-auto">
          <div 
            ref={containerRef}
            className={`testimonials-stack card-${activeCard}-active relative`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            style={{
              display: 'grid',
              gridTemplateAreas: '"stack"',
              minHeight: '400px'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card glass-effect ${
                  dragDirection === 'left' ? 'dragging-left' : 
                  dragDirection === 'right' ? 'dragging-right' : ''
                }`}
                style={{
                  gridArea: 'stack',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '16px',
                  transition: 'all 500ms ease-in-out',
                  transform: `translateY(${index === activeCard - 1 ? '0' : index < activeCard - 1 ? '-64px' : '-32px'}) scale(${index === activeCard - 1 ? '1' : index < activeCard - 1 ? '0.75' : '0.9'})`,
                  opacity: index === activeCard - 1 ? '1' : index < activeCard - 1 ? '0.4' : '0.7',
                  zIndex: index === activeCard - 1 ? '3' : index < activeCard - 1 ? '1' : '2',
                  boxShadow: index === activeCard - 1 ? 
                    '0px 0px 0px 1px rgba(139, 92, 246, 0.1), 0px 1px 1px -0.5px rgba(139, 92, 246, 0.05), 0px 3px 3px -1.5px rgba(0,0,0,0.3), 0px 6px 6px -3px rgba(0,0,0,0.3), 0px 12px 12px -6px rgba(0,0,0,0.3), 0px 24px 24px -12px rgba(0,0,0,0.3)' :
                    '0px 0px 0px 1px rgba(139, 92, 246, 0.05), 0px 1px 1px -0.5px rgba(139, 92, 246, 0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.2)',
                  userSelect: 'none',
                  cursor: index === activeCard - 1 ? 'grab' : 'pointer'
                }}
                onClick={() => index !== activeCard - 1 && navigateToCard(testimonial.id)}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getAvatarGradient(testimonial.id)} flex items-center justify-center text-white font-semibold text-lg`}
                        style={{
                          filter: `hue-rotate(${mousePosition.x * 2}deg)`,
                          transition: 'filter 0.3s ease-out'
                        }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-300 text-sm">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                    
                    {/* Drag Indicator */}
                    <div className="flex space-x-1 opacity-50">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-200 leading-relaxed text-lg mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-gray-600/30 pt-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {testimonial.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`text-xs px-2 py-1 rounded-md border ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      {testimonial.stats.teamSize && (
                        <span className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{testimonial.stats.teamSize}</span>
                        </span>
                      )}
                      {testimonial.stats.customerDuration && (
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{testimonial.stats.customerDuration}</span>
                        </span>
                      )}
                      {testimonial.stats.helpful && (
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>Helpful</span>
                        </span>
                      )}
                      {testimonial.stats.verified && (
                        <span className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>Verified</span>
                        </span>
                      )}
                      {testimonial.stats.shared && (
                        <span className="flex items-center space-x-1">
                          <Share className="h-3 w-3" />
                          <span>Shared {testimonial.stats.shared} times</span>
                        </span>
                      )}
                      {testimonial.stats.timeAgo && (
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{testimonial.stats.timeAgo}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToCard(index + 1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeCard === index + 1
                    ? 'bg-purple-400 scale-125 shadow-lg shadow-purple-400/50'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-16 hidden lg:block">
            <button
              onClick={() => navigateToCard(activeCard === 1 ? 3 : activeCard - 1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-16 hidden lg:block">
            <button
              onClick={() => navigateToCard(activeCard === 3 ? 1 : activeCard + 1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group hover:scale-110"
            >
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Swipe Hint */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
              <span>←</span>
              <span>Drag cards to navigate</span>
              <span>→</span>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: 'Happy Students', icon: '👥' },
              { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
              { number: '500+', label: 'Companies Trust Us', icon: '🏢' },
              { number: '95%', label: 'Success Rate', icon: '🎯' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                style={{
                  transform: `translateY(${Math.sin((mousePosition.x + mousePosition.y + index * 30) * 0.01) * 3}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dragging-left {
          transform: translateX(-20px) !important;
        }
        .dragging-right {
          transform: translateX(20px) !important;
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;