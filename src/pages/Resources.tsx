import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Youtube, 
  Globe, 
  Brain,
  BookOpen,
  Code,
  Database,
  Shield,
  Cloud,
  Cpu,
  Smartphone,
  Gamepad2,
  Bitcoin,
  ChevronRight,
  Star,
  Clock,
  Users
} from 'lucide-react';

const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResourceType, setSelectedResourceType] = useState('All');

  const categories = [
    { name: 'All', icon: BookOpen },
    { name: 'Programming', icon: Code },
    { name: 'AI & ML', icon: Cpu },
    { name: 'Data Science', icon: Database },
    { name: 'Cybersecurity', icon: Shield },
    { name: 'Cloud Computing', icon: Cloud },
    { name: 'Web Development', icon: Globe },
    { name: 'Mobile Development', icon: Smartphone },
    { name: 'Game Development', icon: Gamepad2 },
    { name: 'Blockchain', icon: Bitcoin },
  ];

  const youtubeResources = [
    {
      title: 'Python Programming Complete Playlist',
      category: 'Programming',
      channel: 'TechEd Academy',
      views: '2.1M',
      duration: '45 videos',
      rating: 4.9,
      url: 'https://youtube.com/playlist?list=example1',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      title: 'Machine Learning Fundamentals',
      category: 'AI & ML',
      channel: 'ML Masters',
      views: '1.8M',
      duration: '38 videos',
      rating: 4.8,
      url: 'https://youtube.com/playlist?list=example2',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      title: 'Cybersecurity Bootcamp',
      category: 'Cybersecurity',
      channel: 'SecureCode',
      views: '950K',
      duration: '52 videos',
      rating: 4.7,
      url: 'https://youtube.com/playlist?list=example3',
      thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      title: 'AWS Cloud Architecture',
      category: 'Cloud Computing',
      channel: 'CloudGuru',
      views: '1.2M',
      duration: '41 videos',
      rating: 4.9,
      url: 'https://youtube.com/playlist?list=example4',
      thumbnail: 'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    }
  ];

  const aiResearchLists = [
    {
      title: 'Latest AI Research Papers 2024',
      category: 'AI & ML',
      items: 15,
      updated: '2 days ago',
      description: 'Curated collection of breakthrough AI research papers from top conferences',
      topics: ['Neural Networks', 'Computer Vision', 'NLP', 'Reinforcement Learning']
    },
    {
      title: 'Cybersecurity Tools & Resources',
      category: 'Cybersecurity',
      items: 23,
      updated: '5 days ago',
      description: 'Essential tools, frameworks, and resources for cybersecurity professionals',
      topics: ['Penetration Testing', 'Malware Analysis', 'Network Security', 'Incident Response']
    },
    {
      title: 'Cloud Computing Best Practices',
      category: 'Cloud Computing',
      items: 18,
      updated: '1 week ago',
      description: 'Comprehensive guide to cloud architecture patterns and best practices',
      topics: ['AWS', 'Azure', 'GCP', 'DevOps', 'Containerization']
    },
    {
      title: 'Web Development Trends 2024',
      category: 'Web Development',
      items: 12,
      updated: '3 days ago',
      description: 'Latest trends, frameworks, and tools in modern web development',
      topics: ['React', 'Next.js', 'TypeScript', 'WebAssembly', 'Progressive Web Apps']
    }
  ];

  const externalTools = [
    {
      name: 'GitHub',
      category: 'Programming',
      description: 'World\'s leading software development platform',
      url: 'https://github.com',
      icon: '🐱',
      type: 'Platform'
    },
    {
      name: 'Kaggle',
      category: 'Data Science',
      description: 'Machine learning and data science community',
      url: 'https://kaggle.com',
      icon: '📊',
      type: 'Platform'
    },
    {
      name: 'AWS Console',
      category: 'Cloud Computing',
      description: 'Amazon Web Services management console',
      url: 'https://aws.amazon.com',
      icon: '☁️',
      type: 'Platform'
    },
    {
      name: 'CodePen',
      category: 'Web Development',
      description: 'Online code editor and learning environment',
      url: 'https://codepen.io',
      icon: '✏️',
      type: 'Tool'
    },
    {
      name: 'Unity Learn',
      category: 'Game Development',
      description: 'Game development learning platform',
      url: 'https://learn.unity.com',
      icon: '🎮',
      type: 'Platform'
    },
    {
      name: 'Remix IDE',
      category: 'Blockchain',
      description: 'Ethereum smart contract development',
      url: 'https://remix.ethereum.org',
      icon: '⛓️',
      type: 'Tool'
    }
  ];

  const filteredYouTube = selectedCategory === 'All' 
    ? youtubeResources 
    : youtubeResources.filter(resource => resource.category === selectedCategory);

  const filteredResearch = selectedCategory === 'All' 
    ? aiResearchLists 
    : aiResearchLists.filter(resource => resource.category === selectedCategory);

  const filteredTools = selectedCategory === 'All' 
    ? externalTools 
    : externalTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">Explore curated external resources, YouTube content, and AI-powered research materials</p>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Search Widget */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 mb-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Quick Google Search</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for tech topics, tutorials, documentation..."
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-400 focus:outline-none"
            />
          </div>
          <button className="bg-accent-500 hover:bg-accent-600 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
        <p className="text-primary-100 text-sm mt-2">
          Instantly search Google for technical resources, documentation, and tutorials
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* YouTube Resources */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Youtube className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">YouTube Playlists</h2>
            </div>
            
            <div className="space-y-4">
              {filteredYouTube.map((resource, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-20 h-14 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-500">{resource.channel} • {resource.views} views</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500">{resource.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{resource.duration}</span>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Research Lists */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">AI-Curated Research</h2>
            </div>
            
            <div className="space-y-4">
              {filteredResearch.map((list, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {list.title}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{list.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{list.items} items</span>
                      <span>Updated {list.updated}</span>
                    </div>
                    <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {list.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {list.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* External Tools Sidebar */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">External Tools</h2>
            </div>
            
            <div className="space-y-3">
              {filteredTools.map((tool, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          {tool.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                      <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded mt-2 inline-block">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-primary-50 text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-primary-100 transition-colors">
              View All Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;