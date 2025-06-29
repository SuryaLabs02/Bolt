import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  Target,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Code,
  Lightbulb,
  Zap,
  Star,
  ArrowRight,
  ExternalLink,
  Play,
  Download,
  FileText,
  Rocket
} from 'lucide-react';

const Hackathons: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const upcomingHackathons = [
    {
      id: 1,
      name: 'AI Innovation Challenge 2024',
      date: 'March 15-17, 2024',
      daysLeft: 12,
      participants: 2500,
      prize: '$50,000',
      difficulty: 'Intermediate',
      tags: ['AI', 'Machine Learning', 'Innovation'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      urgent: true
    },
    {
      id: 2,
      name: 'Web3 Future Hackathon',
      date: 'March 22-24, 2024',
      daysLeft: 19,
      participants: 1800,
      prize: '$30,000',
      difficulty: 'Advanced',
      tags: ['Blockchain', 'Web3', 'DeFi'],
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      urgent: false
    },
    {
      id: 3,
      name: 'Sustainable Tech Challenge',
      date: 'April 5-7, 2024',
      daysLeft: 33,
      participants: 3200,
      prize: '$75,000',
      difficulty: 'Beginner',
      tags: ['Sustainability', 'IoT', 'Green Tech'],
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      urgent: false
    }
  ];

  const preparationChecklist = [
    {
      id: 1,
      category: 'Team Formation',
      title: 'Find Your Dream Team',
      description: 'Connect with developers, designers, and domain experts',
      timeEstimate: '1-2 weeks',
      priority: 'high',
      resources: ['Team Building Guide', 'Skill Matching Platform']
    },
    {
      id: 2,
      category: 'Skill Development',
      title: 'Master Core Technologies',
      description: 'Brush up on essential programming languages and frameworks',
      timeEstimate: '2-4 weeks',
      priority: 'high',
      resources: ['Tech Stack Guide', 'Quick Learning Paths']
    },
    {
      id: 3,
      category: 'Ideation',
      title: 'Brainstorm Winning Ideas',
      description: 'Research problem statements and develop innovative solutions',
      timeEstimate: '3-5 days',
      priority: 'medium',
      resources: ['Ideation Toolkit', 'Past Winners Analysis']
    },
    {
      id: 4,
      category: 'Tools & Setup',
      title: 'Prepare Development Environment',
      description: 'Set up IDEs, version control, and collaboration tools',
      timeEstimate: '1-2 days',
      priority: 'medium',
      resources: ['Setup Checklist', 'Tool Recommendations']
    },
    {
      id: 5,
      category: 'Presentation',
      title: 'Perfect Your Pitch',
      description: 'Learn to present your solution effectively to judges',
      timeEstimate: '2-3 days',
      priority: 'medium',
      resources: ['Pitch Deck Template', 'Presentation Tips']
    },
    {
      id: 6,
      category: 'Legal & Logistics',
      title: 'Handle Documentation',
      description: 'Complete registration, agreements, and travel arrangements',
      timeEstimate: '1 day',
      priority: 'low',
      resources: ['Registration Guide', 'Travel Tips']
    }
  ];

  const quickStartGuides = [
    {
      title: 'Hackathon Survival Guide',
      description: 'Everything you need to know for your first hackathon',
      duration: '15 min read',
      type: 'Guide',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Rapid Prototyping Techniques',
      description: 'Build MVPs quickly with these proven methods',
      duration: '20 min read',
      type: 'Tutorial',
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      title: 'Team Collaboration Best Practices',
      description: 'Work effectively with your team under pressure',
      duration: '12 min read',
      type: 'Guide',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Winning Presentation Strategies',
      description: 'Impress judges with compelling demos and pitches',
      duration: '18 min read',
      type: 'Tutorial',
      icon: Trophy,
      color: 'bg-purple-500'
    }
  ];

  const essentialTools = [
    { name: 'GitHub', category: 'Version Control', description: 'Collaborate on code seamlessly' },
    { name: 'Figma', category: 'Design', description: 'Create stunning UI/UX designs' },
    { name: 'Discord', category: 'Communication', description: 'Stay connected with your team' },
    { name: 'Notion', category: 'Project Management', description: 'Organize ideas and tasks' },
    { name: 'Vercel', category: 'Deployment', description: 'Deploy your projects instantly' },
    { name: 'Postman', category: 'API Testing', description: 'Test and debug APIs efficiently' }
  ];

  const toggleChecklistItem = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const completionPercentage = Math.round((checkedItems.length / preparationChecklist.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hackathon Preparation</h1>
            <p className="text-gray-600">Get ready to dominate your next hackathon with proper preparation</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Preparation Progress</h2>
            <span className="text-2xl font-bold text-orange-600">{completionPercentage}%</span>
          </div>
          <div className="bg-white h-4 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {checkedItems.length} of {preparationChecklist.length} preparation steps completed
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Hackathons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-orange-500" />
                <span>Upcoming Hackathons</span>
              </h2>
              <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {upcomingHackathons.map((hackathon) => (
                <div key={hackathon.id} className="relative bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  {hackathon.urgent && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      Urgent!
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <img
                      src={hackathon.image}
                      alt={hackathon.name}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{hackathon.name}</h3>
                          <p className="text-sm text-gray-600">{hackathon.date}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${hackathon.urgent ? 'text-red-600' : 'text-orange-600'}`}>
                            {hackathon.daysLeft} days
                          </div>
                          <p className="text-xs text-gray-500">remaining</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{hackathon.participants.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4" />
                          <span>{hackathon.prize}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          hackathon.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          hackathon.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {hackathon.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {hackathon.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span>Preparation Checklist</span>
            </h2>

            <div className="space-y-4">
              {preparationChecklist.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        checkedItems.includes(item.id)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {checkedItems.includes(item.id) && <CheckCircle className="h-3 w-3" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-medium ${checkedItems.includes(item.id) ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className="text-xs text-gray-500">{item.timeEstimate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <div className="flex space-x-1">
                          {item.resources.map((resource, index) => (
                            <button key={index} className="text-xs text-orange-600 hover:text-orange-700 underline">
                              {resource}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Start Guides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Quick Start Guides</span>
            </h3>
            
            <div className="space-y-3">
              {quickStartGuides.map((guide, index) => {
                const Icon = guide.icon;
                return (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group">
                    <div className="flex items-start space-x-3">
                      <div className={`${guide.color} p-2 rounded-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                          {guide.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{guide.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{guide.duration}</span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                            {guide.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Essential Tools */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Code className="h-5 w-5 text-blue-500" />
              <span>Essential Tools</span>
            </h3>
            
            <div className="space-y-3">
              {essentialTools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{tool.name}</h4>
                    <p className="text-xs text-gray-600">{tool.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Prep */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Last-Minute Prep</h3>
            </div>
            <p className="text-red-100 text-sm mb-4">
              Hackathon starting soon? Don't panic! Here's your emergency preparation kit.
            </p>
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Emergency Kit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hackathons;