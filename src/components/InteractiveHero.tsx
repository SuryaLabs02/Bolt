import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AnimatedLandingPage from './AnimatedLandingPage';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Zap,
  Globe,
  Code,
  Database,
  Shield,
  Cloud,
  Cpu,
  Smartphone,
  Gamepad2,
  Bitcoin,
  Trophy,
  Play,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const InteractiveHero: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isAuthenticated, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHeroContent, setShowHeroContent] = useState(false);

  // Show hero content after initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 4000); // Show after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAuthLoading(true);
      setError('');
      
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const techCategories = [
    { name: 'Programming', icon: Code, color: 'bg-blue-500', students: '50K+' },
    { name: 'AI & ML', icon: Cpu, color: 'bg-purple-500', students: '35K+' },
    { name: 'Data Science', icon: Database, color: 'bg-green-500', students: '40K+' },
    { name: 'Cybersecurity', icon: Shield, color: 'bg-red-500', students: '25K+' },
    { name: 'Cloud Computing', icon: Cloud, color: 'bg-indigo-500', students: '30K+' },
    { name: 'Web Development', icon: Globe, color: 'bg-orange-500', students: '60K+' },
    { name: 'Mobile Dev', icon: Smartphone, color: 'bg-pink-500', students: '28K+' },
    { name: 'Game Dev', icon: Gamepad2, color: 'bg-yellow-500', students: '20K+' },
    { name: 'Blockchain', icon: Bitcoin, color: 'bg-teal-500', students: '15K+' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Hands-on learning with real projects, quizzes, and coding labs',
      highlight: '500+ Courses'
    },
    {
      icon: Globe,
      title: 'External Resources',
      description: 'YouTube playlists, Google search, and AI-curated research materials',
      highlight: 'Live Content'
    },
    {
      icon: Users,
      title: 'Live Events',
      description: 'Workshops, webinars, and community challenges with experts',
      highlight: 'Weekly Events'
    },
    {
      icon: Trophy,
      title: 'Global Hackathons',
      description: 'Participate in hackathons from around the world powered by Devpost',
      highlight: 'Win Prizes'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Badges, certificates, and leaderboards to track your progress',
      highlight: 'Get Certified'
    }
  ];

  const stats = [
    { number: '300K+', label: 'Active Students', icon: Users },
    { number: '500+', label: 'Courses Available', icon: BookOpen },
    { number: '50+', label: 'Expert Instructors', icon: Award },
    { number: '95%', label: 'Success Rate', icon: Trophy },
  ];

  // For non-authenticated users, show the animated landing page first, then hero content
  if (!isAuthenticated && !loading) {
    return (
      <div className="relative">
        {/* Animated Landing Page */}
        <AnimatedLandingPage />
        
        {/* Hero Content - Shows after animation */}
        {showHeroContent && (
          <div id="hero-section" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-20 left-10 animate-bounce">
                <Sparkles className="h-8 w-8 text-primary-500 opacity-60" />
              </div>
              <div className="absolute top-40 right-20 animate-pulse">
                <Code className="h-12 w-12 text-secondary-500 opacity-40" />
              </div>
              <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
                <Cpu className="h-10 w-10 text-accent-500 opacity-50" />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="text-center lg:text-left">
                    <div className="mb-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-700 mb-4">
                        <Star className="h-4 w-4 mr-2" />
                        #1 Tech Learning Platform
                      </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                      Master Every
                      <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        Technology Domain
                      </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                      Join 300,000+ students learning cutting-edge technologies through interactive courses, 
                      real projects, and expert guidance. Build your tech career today.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div key={index} className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Icon className="h-6 w-6 text-primary-600 mr-2" />
                              <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                            </div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <button
                        onClick={handleGoogleSignIn}
                        disabled={authLoading}
                        className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                      >
                        {authLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Play className="h-5 w-5 mr-2" />
                        )}
                        Start Learning Free
                      </button>
                      
                      <button className="flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Explore Courses
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Free to start
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        No credit card
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Cancel anytime
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Auth Form */}
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-600">
                          {isSignUp ? 'Start your learning journey today' : 'Continue your tech journey'}
                        </p>
                      </div>

                      {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleEmailAuth} className="space-y-4">
                        {isSignUp && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                        )}
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={authLoading}
                          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50"
                        >
                          {authLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            isSignUp ? 'Create Account' : 'Sign In'
                          )}
                        </button>
                      </form>

                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                          </div>
                        </div>

                        <button
                          onClick={handleGoogleSignIn}
                          disabled={authLoading}
                          className="mt-4 w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continue with Google
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-600">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                          onClick={() => setIsSignUp(!isSignUp)}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tech Categories */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Learn Every Technology Domain
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    From programming fundamentals to cutting-edge AI, we cover all major tech fields
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {techCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={category.name}
                        className="group bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h3>
                        <p className="text-xs text-gray-500">{category.students} students</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Everything You Need to Excel
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive learning experience with multiple resources and unique features
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="h-6 w-6 text-primary-600" />
                          </div>
                          <span className="text-sm font-medium text-accent-600 bg-accent-100 px-3 py-1 rounded-full">
                            {feature.highlight}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
              <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Tech Journey?
                </h2>
                <p className="text-xl mb-8 text-primary-100">
                  Join thousands of students already learning and building their tech careers
                </p>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={authLoading}
                  className="bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-lg inline-flex items-center space-x-2 disabled:opacity-50"
                >
                  {authLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                  <span>Get Started Now - It's Free!</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }

  // For authenticated users, redirect to dashboard
  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading InnovateX Campus...</p>
      </div>
    </div>
  );
};

export default InteractiveHero;