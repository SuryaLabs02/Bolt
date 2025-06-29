import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  Star,
  Play,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUp,
  Brain,
  Rocket,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const InteractiveHero: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isAuthenticated, isFirebaseReady } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const techCategories = [
    { name: 'Programming', icon: Code, color: 'bg-blue-500' },
    { name: 'AI & ML', icon: Cpu, color: 'bg-purple-500' },
    { name: 'Data Science', icon: Database, color: 'bg-green-500' },
    { name: 'Cybersecurity', icon: Shield, color: 'bg-red-500' },
    { name: 'Cloud Computing', icon: Cloud, color: 'bg-indigo-500' },
    { name: 'Web Development', icon: Globe, color: 'bg-orange-500' },
    { name: 'Mobile Dev', icon: Smartphone, color: 'bg-pink-500' },
    { name: 'Game Dev', icon: Gamepad2, color: 'bg-yellow-500' },
    { name: 'Blockchain', icon: Bitcoin, color: 'bg-teal-500' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Hands-on learning with real projects, quizzes, and coding labs'
    },
    {
      icon: Globe,
      title: 'External Resources',
      description: 'YouTube playlists, Google search, and AI-curated research materials'
    },
    {
      icon: Users,
      title: 'Live Events',
      description: 'Workshops, webinars, and community challenges with experts'
    },
    {
      icon: Trophy,
      title: 'Global Hackathons',
      description: 'Participate in hackathons from around the world powered by Devpost'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Badges, certificates, and leaderboards to track your progress'
    }
  ];

  const handleGoogleSignIn = async () => {
    if (!isFirebaseReady) {
      setError('Authentication service is not ready. Please try again in a moment.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFirebaseReady) {
      setError('Authentication service is not ready. Please try again in a moment.');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp && !name) {
      setError('Please enter your name');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || `Failed to ${isSignUp ? 'sign up' : 'sign in'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Welcome Back Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Welcome back to SkillSync Academy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Continue Your
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Tech Journey
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Pick up where you left off and explore new technologies with our comprehensive learning platform
            </p>

            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Courses Available', value: '500+', icon: BookOpen },
              { label: 'Active Students', value: '50K+', icon: Users },
              { label: 'Tech Domains', value: '15+', icon: Target },
              { label: 'Success Rate', value: '95%', icon: TrendingUp }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <Icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Tech Categories */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Technology Domains
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              From programming fundamentals to cutting-edge AI, we cover all major tech fields
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {techCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.name}
                    className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Comprehensive learning experience with multiple resources and unique features
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
              <Rocket className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Welcome to SkillSync Academy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Every
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Technology Domain
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              From programming fundamentals to cutting-edge AI, accelerate your tech career with comprehensive courses, hands-on projects, and expert guidance.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Courses', value: '500+' },
                { label: 'Students', value: '50K+' },
                { label: 'Success Rate', value: '95%' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Categories Preview */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-4">Popular domains:</p>
              <div className="flex flex-wrap gap-2">
                {techCategories.slice(0, 6).map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm">
                      <Icon className="h-4 w-4 text-primary-600" />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl inline-block mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Join SkillSync Academy' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Start your tech learning journey today' : 'Continue your learning journey'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {!isFirebaseReady && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <p className="text-yellow-600 text-sm">Authentication service is loading...</p>
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-6">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required={isSignUp}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                disabled={isLoading || !isFirebaseReady}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading || !isFirebaseReady}
                className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            {isSignUp && (
              <p className="mt-4 text-xs text-gray-500 text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;