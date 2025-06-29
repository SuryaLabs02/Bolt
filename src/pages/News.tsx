import React, { useState } from 'react';
import { 
  Newspaper, 
  Bell, 
  Settings, 
  ExternalLink, 
  Bookmark,
  Share2,
  Clock,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All', 'AI & ML', 'Web Development', 'Cybersecurity', 'Blockchain', 
    'Cloud Computing', 'Mobile Development', 'Data Science', 'DevOps'
  ];

  const newsItems = [
    {
      id: 1,
      title: 'OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities',
      category: 'AI & ML',
      source: 'TechCrunch',
      time: '2 hours ago',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      excerpt: 'The latest iteration of ChatGPT brings unprecedented understanding of text, images, audio, and video in a single model.',
      readTime: '3 min read',
      trending: true,
      bookmarked: false
    },
    {
      id: 2,
      title: 'React 19 Beta Released with Game-Changing Server Components',
      category: 'Web Development',
      source: 'React Blog',
      time: '4 hours ago',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      excerpt: 'Meta releases React 19 beta featuring enhanced server components, concurrent features, and improved developer experience.',
      readTime: '5 min read',
      trending: true,
      bookmarked: true
    },
    {
      id: 3,
      title: 'Major Security Vulnerability Discovered in Popular Docker Images',
      category: 'Cybersecurity',
      source: 'Security Weekly',
      time: '6 hours ago',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      excerpt: 'Critical vulnerability affects millions of containerized applications worldwide. Immediate patching recommended.',
      readTime: '4 min read',
      trending: false,
      bookmarked: false
    },
    {
      id: 4,
      title: 'Ethereum 2.0 Staking Rewards Reach All-Time High',
      category: 'Blockchain',
      source: 'CoinDesk',
      time: '8 hours ago',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      excerpt: 'Network validators are seeing unprecedented returns as Ethereum continues its transition to proof-of-stake.',
      readTime: '2 min read',
      trending: false,
      bookmarked: false
    },
    {
      id: 5,
      title: 'AWS Launches New AI-Powered Development Tools',
      category: 'Cloud Computing',
      source: 'AWS News',
      time: '12 hours ago',
      image: 'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      excerpt: 'Amazon Web Services introduces CodeWhisperer 2.0 with enhanced AI code generation and debugging capabilities.',
      readTime: '6 min read',
      trending: false,
      bookmarked: true
    },
    {
      id: 6,
      title: 'Flutter 4.0 Brings Native Performance to Web Applications',
      category: 'Mobile Development',
      source: 'Flutter Dev',
      time: '1 day ago',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      excerpt: 'Google\'s latest Flutter update promises near-native performance for web applications with improved rendering engine.',
      readTime: '4 min read',
      trending: false,
      bookmarked: false
    }
  ];

  const upcomingEvents = [
    { name: 'AI Conference 2024', date: 'Jan 25', category: 'AI & ML' },
    { name: 'React Summit', date: 'Feb 10', category: 'Web Development' },
    { name: 'DefCon 32', date: 'Mar 15', category: 'Cybersecurity' },
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: number) => {
    // In a real app, this would update the backend
    console.log('Toggle bookmark for article:', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech News</h1>
            <p className="text-gray-600">Stay updated with the latest technology trends and announcements</p>
          </div>
          
          {/* Notification Settings */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Bell className={`h-5 w-5 ${notificationsEnabled ? 'text-primary-600' : 'text-gray-400'}`} />
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
              </label>
              <span className="text-sm text-gray-600">Notifications</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main News Feed */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredNews.map((item, index) => (
              <article key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-primary-600 font-medium">{item.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{item.source}</span>
                        {item.trending && (
                          <>
                            <span className="text-gray-300">•</span>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4 text-red-500" />
                              <span className="text-sm text-red-500 font-medium">Trending</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleBookmark(item.id)}
                          className={`p-1 rounded ${
                            item.bookmarked ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
                          } transition-colors`}
                        >
                          <Bookmark className={`h-4 w-4 ${item.bookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.time}</span>
                        </div>
                        <span>{item.readTime}</span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
            <div className="space-y-3">
              {['AI Breakthroughs', 'React 19', 'Quantum Computing', 'Web3 Security', 'Cloud AI'].map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <span className="text-sm font-medium text-gray-700">{topic}</span>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <h4 className="font-medium text-gray-900 text-sm">{event.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {event.category}
                    </span>
                    <span className="text-xs text-gray-500">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-primary-100 text-sm mb-4">
              Get the latest tech news delivered to your inbox
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-400 focus:outline-none"
              />
              <button className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;