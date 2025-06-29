import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar,
  Clock,
  Star,
  Users,
  ExternalLink,
  Play,
  ChevronRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const recentCourses = [
    { name: 'Advanced React Patterns', progress: 75, category: 'Web Development', time: '2h left' },
    { name: 'Machine Learning Fundamentals', progress: 45, category: 'AI & ML', time: '5h left' },
    { name: 'Cloud Architecture', progress: 90, category: 'Cloud Computing', time: '30m left' },
  ];

  const upcomingEvents = [
    { name: 'AI Workshop', date: 'Tomorrow', time: '2:00 PM', attendees: 156 },
    { name: 'Blockchain Hackathon', date: 'This Weekend', time: '9:00 AM', attendees: 89 },
    { name: 'Cybersecurity Webinar', date: 'Next Week', time: '3:00 PM', attendees: 234 },
  ];

  const achievements = [
    { name: 'First Course', icon: '🎯', earned: true },
    { name: 'Quiz Master', icon: '🧠', earned: true },
    { name: 'Lab Expert', icon: '⚗️', earned: true },
    { name: 'Community Helper', icon: '🤝', earned: false },
  ];

  const techNews = [
    { title: 'OpenAI Releases GPT-5', time: '2h ago', category: 'AI' },
    { title: 'New React 19 Features', time: '4h ago', category: 'Web Dev' },
    { title: 'Quantum Computing Breakthrough', time: '1d ago', category: 'Computing' },
  ];

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600">Ready to continue your tech learning journey?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{user.points}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Courses Completed</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Level</p>
              <p className="text-2xl font-bold text-gray-900">{user.level}</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{user.achievements.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="bg-primary-100 p-2 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Play className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.category} • {course.time}</p>
                    <div className="mt-2">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg text-center transition-all ${
                    achievement.earned 
                      ? 'bg-accent-50 border-2 border-accent-200' 
                      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 text-sm">{event.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech News */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Tech News</h2>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {techNews.map((news, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 text-sm">{news.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;