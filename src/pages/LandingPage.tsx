import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InteractiveHero from '../components/InteractiveHero';
import TestimonialsSection from '../components/TestimonialsSection';
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
  Trophy
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

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

  return (
    <div className="min-h-screen">
      {/* Interactive Hero Section */}
      <InteractiveHero />

      {/* Show additional sections only for authenticated users */}
      {isAuthenticated && (
        <>
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
                      className="group bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
                      className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
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
          </section>
        </>
      )}

      {/* Testimonials Section - Always show */}
      <TestimonialsSection />

      {/* CTA Section - Only show for authenticated users */}
      {isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Tech Journey?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of students already learning and building their tech careers
            </p>
            <Link
              to="/dashboard"
              className="bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-lg inline-flex items-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;