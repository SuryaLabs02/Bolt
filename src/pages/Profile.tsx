import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Award, 
  BookOpen, 
  Clock, 
  Star,
  Settings,
  Bell,
  Shield,
  Globe,
  Mail,
  Edit3,
  Save,
  X,
  Trophy,
  Target,
  Calendar,
  TrendingUp
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate full-stack developer with expertise in React, Node.js, and cloud technologies.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    interests: ['Web Development', 'AI & ML', 'Cloud Computing']
  });

  const stats = [
    { label: 'Courses Completed', value: '12', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Study Hours', value: '156', icon: Clock, color: 'text-green-600' },
    { label: 'Achievements', value: '8', icon: Award, color: 'text-purple-600' },
    { label: 'Current Streak', value: '15 days', icon: Target, color: 'text-orange-600' },
  ];

  const recentActivity = [
    { type: 'completed', title: 'Advanced React Patterns', date: '2 days ago', category: 'Web Development' },
    { type: 'achievement', title: 'Earned "Quiz Master" badge', date: '1 week ago', category: 'Achievement' },
    { type: 'started', title: 'Machine Learning Fundamentals', date: '1 week ago', category: 'AI & ML' },
    { type: 'event', title: 'Attended AI Workshop', date: '2 weeks ago', category: 'Event' },
  ];

  const achievements = [
    { name: 'First Course', description: 'Complete your first course', icon: '🎯', earned: true, date: 'Dec 2023' },
    { name: 'Quiz Master', description: 'Score 100% on 5 quizzes', icon: '🧠', earned: true, date: 'Jan 2024' },
    { name: 'Lab Expert', description: 'Complete 10 hands-on labs', icon: '⚗️', earned: true, date: 'Jan 2024' },
    { name: 'Community Helper', description: 'Help 20 students in forums', icon: '🤝', earned: false, progress: 45 },
    { name: 'Streak Master', description: 'Maintain 30-day learning streak', icon: '🔥', earned: false, progress: 75 },
    { name: 'Event Enthusiast', description: 'Attend 5 live events', icon: '🎪', earned: false, progress: 20 },
  ];

  const learningGoals = [
    { title: 'Complete AI/ML Specialization', progress: 60, target: 'March 2024' },
    { title: 'Earn AWS Certification', progress: 30, target: 'April 2024' },
    { title: 'Build 3 Portfolio Projects', progress: 80, target: 'February 2024' },
  ];

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h1>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
    console.log('Saving profile:', editedProfile);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return '✅';
      case 'achievement': return '🏆';
      case 'started': return '🚀';
      case 'event': return '📅';
      default: return '📝';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-primary-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-accent-500 text-white p-2 rounded-full text-xs font-bold">
                {user.level}
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-primary-300 focus:border-primary-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-primary-500 focus:outline-none"
                  />
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    className="text-gray-600 bg-transparent border border-gray-300 rounded-lg p-2 focus:border-primary-500 focus:outline-none w-full"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600 mt-2">{editedProfile.bio}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{editedProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{editedProfile.website}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span>Achievements</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? 'bg-accent-50 border-accent-200 text-accent-900' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm opacity-80">{achievement.description}</p>
                      {achievement.earned ? (
                        <p className="text-xs mt-1 font-medium">Earned {achievement.date}</p>
                      ) : (
                        <div className="mt-2">
                          <div className="bg-gray-200 h-2 rounded-full">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1">{achievement.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-500" />
              <span>Learning Goals</span>
            </h2>
            
            <div className="space-y-4">
              {learningGoals.map((goal, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    <span className="text-sm text-gray-500">{goal.target}</span>
                  </div>
                  <div className="bg-gray-200 h-3 rounded-full">
                    <div 
                      className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{goal.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span>Recent Activity</span>
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
                        {activity.category}
                      </span>
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {editedProfile.interests.map((interest, index) => (
                <span key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Settings className="h-6 w-6 text-gray-500" />
              <span>Settings</span>
            </h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">Notification Preferences</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">Privacy & Security</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">Account Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;