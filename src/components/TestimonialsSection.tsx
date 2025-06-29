import React, { useState, useEffect, useRef } from 'react';
import { Star, Users, Calendar, ThumbsUp, Shield, Share, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
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
      'from-purple-500 to-blue-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500'
    ];
    return gradients[(id - 1) % gradients.length];
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'featured':
        return 'bg-primary-500/20 text-primary-400 border-primary-500/30';
      case 'enterprise':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'verified':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'startup':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
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
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getAvatarGradient(testimonial.id)} flex items-center justify-center text-white font-semibold text-lg`}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                    
                    {/* Drag Indicator */}
                    <div className="flex space-x-1 opacity-50">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-300 leading-relaxed text-lg mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-gray-700/50 pt-4">
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
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                    ? 'bg-primary-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-16 hidden lg:block">
            <button
              onClick={() => navigateToCard(activeCard === 1 ? 3 : activeCard - 1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-16 hidden lg:block">
            <button
              onClick={() => navigateToCard(activeCard === 3 ? 1 : activeCard + 1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Swipe Hint */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-2">
              <span>←</span>
              <span>Drag cards to navigate</span>
              <span>→</span>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400 text-sm">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400 text-sm">Companies Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
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