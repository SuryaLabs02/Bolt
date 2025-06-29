import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spline from '@splinetool/react-spline';
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
  Github,
  Sparkles,
  Target,
  TrendingUp,
  Rocket,
  Brain,
  Palette,
  Monitor,
  ChevronDown,
  X
} from 'lucide-react';

const InteractiveHero: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isAuthenticated, isFirebaseReady } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [splineLoaded, setSplineLoaded] = useState(false);

  const stats = [
    { number: '50K+', label: 'Active Students', icon: Users, color: 'from-emerald-400 to-teal-500' },
    { number: '500+', label: 'Expert Courses', icon: BookOpen, color: 'from-violet-400 to-purple-500' },
    { number: '95%', label: 'Success Rate', icon: Target, color: 'from-orange-400 to-red-500' },
    { number: '4.9★', label: 'Student Rating', icon: Star, color: 'from-yellow-400 to-amber-500' }
  ];

  const techCategories = [
    { name: 'Programming', icon: Code, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-500/10' },
    { name: 'AI & ML', icon: Cpu, color: 'from-purple-400 to-violet-500', bgColor: 'bg-purple-500/10' },
    { name: 'Data Science', icon: Database, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-500/10' },
    { name: 'Cybersecurity', icon: Shield, color: 'from-red-400 to-rose-500', bgColor: 'bg-red-500/10' },
    { name: 'Cloud Computing', icon: Cloud, color: 'from-indigo-400 to-blue-500', bgColor: 'bg-indigo-500/10' },
    { name: 'Web Development', icon: Globe, color: 'from-orange-400 to-yellow-500', bgColor: 'bg-orange-500/10' },
    { name: 'Mobile Dev', icon: Smartphone, color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-500/10' },
    { name: 'Game Dev', icon: Gamepad2, color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-500/10' },
    { name: 'Blockchain', icon: Bitcoin, color: 'from-teal-400 to-cyan-500', bgColor: 'bg-teal-500/10' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Hands-on projects and real-world applications',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Trophy,
      title: 'Industry Recognition',
      description: 'Certificates valued by top tech companies',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: '1-on-1 guidance from industry professionals',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Zap,
      title: 'Fast-Track Learning',
      description: 'Accelerated paths to master new skills',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  // Moving tech logos data
  const techLogos = [
    { name: 'YouTube', icon: '🎥', color: 'text-red-400', bgColor: 'bg-red-500/20' },
    { name: 'Devpost', icon: '🚀', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    { name: 'Hackathons', icon: '🏆', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
    { name: 'Courses', icon: '📚', color: 'text-green-400', bgColor: 'bg-green-500/20' },
    { name: 'GitHub', icon: '🐱', color: 'text-gray-300', bgColor: 'bg-gray-500/20' },
    { name: 'Stack Overflow', icon: '📊', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
    { name: 'LeetCode', icon: '💻', color: 'text-yellow-300', bgColor: 'bg-yellow-500/20' },
    { name: 'Kaggle', icon: '📈', color: 'text-blue-300', bgColor: 'bg-blue-500/20' },
    { name: 'CodePen', icon: '✏️', color: 'text-gray-200', bgColor: 'bg-gray-500/20' },
    { name: 'Discord', icon: '💬', color: 'text-indigo-400', bgColor: 'bg-indigo-500/20' },
    { name: 'Slack', icon: '💼', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    { name: 'Figma', icon: '🎨', color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
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
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl inline-block mb-6 shadow-2xl">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome back to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">SkillSync Academy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Continue your learning journey with personalized courses and expert guidance.
            </p>
          </div>
          
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Continue Learning</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[120vh] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating gradient orbs with new colors */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-32 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-88 h-88 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      {/* Floating Spline Scene - Right Side */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 animate-float">
        <div className="relative w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-cyan-400" />
                <p className="text-sm">Loading 3D Experience...</p>
              </div>
            </div>
          }>
            <Spline 
              scene="https://prod.spline.design/aXNv3GGDJB6QILuV/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
          
          {/* Floating status indicators */}
          <div className="absolute top-4 left-4 bg-cyan-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-400/30 animate-pulse">
            <div className="flex items-center space-x-2 text-cyan-300">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Interactive</span>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-purple-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-400/30 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center space-x-2 text-purple-300">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span className="text-xs font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-4xl">
          
          {/* Hero Content */}
          <div className="space-y-12 text-white">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">SkillSync Academy</span>
                <p className="text-gray-300 text-sm">Master Every Technology Domain</p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="animate-slide-up space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-bold text-lg uppercase tracking-wide">
                  Transform Your Future
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="block text-white">Master</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block animate-pulse">
                  Technology
                </span>
                <span className="block text-white">Excellence</span>
              </h1>
              
              <p className="text-2xl text-gray-300 max-w-3xl leading-relaxed">
                From programming fundamentals to cutting-edge AI, accelerate your tech career with 
                <span className="text-cyan-400 font-semibold"> comprehensive courses</span>, 
                <span className="text-purple-400 font-semibold"> hands-on projects</span>, and 
                <span className="text-emerald-400 font-semibold"> expert mentorship</span>.
              </p>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                      <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="group relative">
                    <div className={`absolute inset-0 ${feature.bgColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                    <div className="relative flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                      <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl flex-shrink-0 shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Tech Categories */}
            <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Popular Learning Paths</h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {techCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.name}
                      className="group relative cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`absolute inset-0 ${category.bgColor} rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                      <div className="relative text-center p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:border-white/20">
                        <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white block">{category.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <button
                onClick={() => setShowAuthForm(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors duration-300">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300">
                  <Play className="h-6 w-6" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
              <ChevronDown className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Moving Tech Logos Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/90 via-indigo-900/90 to-black/90 backdrop-blur-xl border-t border-white/10 py-8 overflow-hidden">
        <div className="relative">
          {/* Moving logos container */}
          <div className="flex animate-scroll-right space-x-8">
            {/* First set of logos */}
            {techLogos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="group flex items-center space-x-4 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer flex-shrink-0 min-w-max"
              >
                <span className="text-3xl">{logo.icon}</span>
                <span className="text-white font-bold text-lg">{logo.name}</span>
                <div className={`w-3 h-3 ${logo.bgColor} rounded-full animate-pulse border border-white/20`}></div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {techLogos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="group flex items-center space-x-4 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer flex-shrink-0 min-w-max"
              >
                <span className="text-3xl">{logo.icon}</span>
                <span className="text-white font-bold text-lg">{logo.name}</span>
                <div className={`w-3 h-3 ${logo.bgColor} rounded-full animate-pulse border border-white/20`}></div>
              </div>
            ))}
          </div>
          
          {/* Enhanced gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/90 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/90 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Enhanced subtitle */}
        <div className="text-center mt-6">
          <p className="text-gray-300 text-lg font-medium">
            🚀 <span className="text-cyan-400">Trusted by developers worldwide</span> • 
            🌟 <span className="text-purple-400">Industry-leading platforms</span> • 
            💡 <span className="text-emerald-400">Learn from the best</span>
          </p>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl animate-materialReveal">
            {/* Close Button */}
            <button
              onClick={() => setShowAuthForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl inline-block mb-4 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Join SkillSync Academy' : 'Welcome Back'}
              </h2>
              <p className="text-gray-300">
                {isSignUp 
                  ? 'Start your learning journey today' 
                  : 'Continue your tech learning journey'
                }
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Firebase Status Warning */}
            {!isFirebaseReady && (
              <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Authentication service is initializing. Please wait a moment before signing in.
                </p>
              </div>
            )}

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading || !isFirebaseReady}
              className="w-full flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 font-medium text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6 hover:scale-105"
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
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-300">or</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 transition-all hover:bg-white/15"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 transition-all hover:bg-white/15"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 transition-all hover:bg-white/15"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isFirebaseReady}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:scale-105"
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
              <p className="text-gray-300">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  disabled={loading}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
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
      )}
    </section>
  );
};

export default InteractiveHero;