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
  CheckCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Github
} from 'lucide-react';

const InteractiveHero: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isAuthenticated, isFirebaseReady } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
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

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || `Failed to ${isSignUp ? 'sign up' : 'sign in'}`);
    } finally {
      setLoading(false);
    }
  };

  // If user is authenticated, show dashboard link
  if (isAuthenticated) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 rounded-2xl inline-block mb-6">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">SkillSync Academy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              You're all set! Continue your learning journey with personalized courses and expert guidance.
            </p>
          </div>
          
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 text-lg inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SkillSync Academy</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Master Every
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block">
                  Technology
                </span>
                Domain
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                From programming fundamentals to cutting-edge AI, accelerate your tech career with comprehensive courses and hands-on projects.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start space-x-3 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                    <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                      <p className="text-gray-600 text-xs">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech Categories Preview */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Popular Learning Paths:</p>
              <div className="flex flex-wrap gap-2">
                {techCategories.slice(0, 6).map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.name}
                      className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className={`${category.color} w-4 h-4 rounded-full flex items-center justify-center`}>
                        <Icon className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Authentication Form */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md mx-auto">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600">
                  {isSignUp 
                    ? 'Start your learning journey today' 
                    : 'Continue your tech learning journey'
                  }
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Firebase Status Warning */}
              {!isFirebaseReady && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Authentication service is initializing. Please wait a moment before signing in.
                  </p>
                </div>
              )}

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading || !isFirebaseReady}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isFirebaseReady}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle Sign Up/Sign In */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError('');
                      setEmail('');
                      setPassword('');
                      setName('');
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    disabled={loading}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>50K+ Students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;