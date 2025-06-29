import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Youtube, 
  Play,
  Clock,
  Users,
  Star,
  ExternalLink,
  BookOpen,
  Code,
  Globe,
  Smartphone,
  Database,
  Cpu,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface YouTubePlaylist {
  id: string;
  title: string;
  channel: string;
  description: string;
  videoCount: number;
  totalDuration: string;
  views: string;
  rating: number;
  thumbnail: string;
  url: string;
  category: string;
  subcategory: string;
  level: string;
  tags: string[];
  lastUpdated: string;
}

const YouTubeCourses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'All', icon: BookOpen, subcategories: [] },
    { 
      name: 'Programming', 
      icon: Code, 
      subcategories: [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 
        'Kotlin', 'PHP', 'Ruby', 'TypeScript', 'Dart', 'Scala', 'R'
      ]
    },
    { 
      name: 'Web Development', 
      icon: Globe, 
      subcategories: [
        'Frontend', 'Backend', 'Full Stack', 'React', 'Vue.js', 'Angular', 
        'Node.js', 'Express', 'Django', 'Flask', 'Laravel', 'Spring Boot'
      ]
    },
    { 
      name: 'Mobile Development', 
      icon: Smartphone, 
      subcategories: [
        'React Native', 'Flutter', 'iOS Development', 'Android Development', 
        'Xamarin', 'Ionic', 'Cordova'
      ]
    },
    { 
      name: 'Data Science', 
      icon: Database, 
      subcategories: [
        'Machine Learning', 'Data Analysis', 'Statistics', 'Pandas', 'NumPy', 
        'Matplotlib', 'Seaborn', 'Jupyter', 'SQL'
      ]
    },
    { 
      name: 'AI & ML', 
      icon: Cpu, 
      subcategories: [
        'TensorFlow', 'PyTorch', 'Keras', 'Computer Vision', 'NLP', 
        'Deep Learning', 'Neural Networks', 'OpenCV'
      ]
    }
  ];

  const youtubePlaylists: YouTubePlaylist[] = [
    // Python Programming Playlists
    {
      id: 'python-complete-course',
      title: 'Complete Python Programming Course - Beginner to Advanced',
      channel: 'Programming with Mosh',
      description: 'Learn Python programming from scratch with hands-on projects and real-world examples.',
      videoCount: 156,
      totalDuration: '18 hours',
      views: '2.1M',
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Beginner',
      tags: ['Python', 'Programming', 'OOP', 'Data Structures'],
      lastUpdated: '2 weeks ago'
    },
    {
      id: 'python-data-science',
      title: 'Python for Data Science Complete Tutorial',
      channel: 'freeCodeCamp.org',
      description: 'Master Python for data science with pandas, numpy, matplotlib, and machine learning.',
      videoCount: 89,
      totalDuration: '12 hours',
      views: '1.8M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Intermediate',
      tags: ['Python', 'Data Science', 'Pandas', 'NumPy'],
      lastUpdated: '1 week ago'
    },
    {
      id: 'python-django',
      title: 'Django Web Development Full Course',
      channel: 'Traversy Media',
      description: 'Build web applications with Django framework from basics to deployment.',
      videoCount: 67,
      totalDuration: '15 hours',
      views: '950K',
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLillGF-RfqbbyKq4GmxwAi9AA8HGmCe23',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Intermediate',
      tags: ['Python', 'Django', 'Web Development', 'Backend'],
      lastUpdated: '3 days ago'
    },

    // JavaScript Programming Playlists
    {
      id: 'javascript-complete',
      title: 'JavaScript Complete Course - ES6+ Modern JavaScript',
      channel: 'The Net Ninja',
      description: 'Master modern JavaScript with ES6+, async programming, and DOM manipulation.',
      videoCount: 134,
      totalDuration: '22 hours',
      views: '3.2M',
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET',
      category: 'Programming',
      subcategory: 'JavaScript',
      level: 'Beginner',
      tags: ['JavaScript', 'ES6+', 'DOM', 'Async Programming'],
      lastUpdated: '5 days ago'
    },
    {
      id: 'javascript-algorithms',
      title: 'JavaScript Algorithms and Data Structures',
      channel: 'freeCodeCamp.org',
      description: 'Learn algorithms and data structures implementation in JavaScript.',
      videoCount: 78,
      totalDuration: '16 hours',
      views: '1.5M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAbnRT_hue-3zyiuIYj0OlpyG',
      category: 'Programming',
      subcategory: 'JavaScript',
      level: 'Advanced',
      tags: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving'],
      lastUpdated: '1 week ago'
    },

    // Java Programming Playlists
    {
      id: 'java-complete-course',
      title: 'Java Programming Complete Course',
      channel: 'Derek Banas',
      description: 'Complete Java programming tutorial covering OOP, collections, and advanced topics.',
      videoCount: 94,
      totalDuration: '20 hours',
      views: '2.8M',
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLE7E8B7F4856C9B19',
      category: 'Programming',
      subcategory: 'Java',
      level: 'Beginner',
      tags: ['Java', 'OOP', 'Collections', 'Spring'],
      lastUpdated: '2 weeks ago'
    },
    {
      id: 'java-spring-boot',
      title: 'Spring Boot Complete Tutorial',
      channel: 'Java Brains',
      description: 'Master Spring Boot framework for building enterprise Java applications.',
      videoCount: 56,
      totalDuration: '14 hours',
      views: '1.2M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLqq-6Pq4lTTbx8p2oCgcAQGQyqN8XeA1x',
      category: 'Programming',
      subcategory: 'Java',
      level: 'Intermediate',
      tags: ['Java', 'Spring Boot', 'REST API', 'Microservices'],
      lastUpdated: '4 days ago'
    },

    // C++ Programming Playlists
    {
      id: 'cpp-complete',
      title: 'C++ Programming Complete Course',
      channel: 'CodeWithHarry',
      description: 'Learn C++ from basics to advanced concepts including STL and templates.',
      videoCount: 87,
      totalDuration: '19 hours',
      views: '1.9M',
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL',
      category: 'Programming',
      subcategory: 'C++',
      level: 'Beginner',
      tags: ['C++', 'STL', 'Templates', 'Memory Management'],
      lastUpdated: '1 week ago'
    },

    // React Web Development Playlists
    {
      id: 'react-complete-course',
      title: 'React JS Complete Course - Hooks, Context, Redux',
      channel: 'Academind',
      description: 'Master React.js with hooks, context API, Redux, and modern development practices.',
      videoCount: 112,
      totalDuration: '25 hours',
      views: '4.1M',
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS',
      category: 'Web Development',
      subcategory: 'React',
      level: 'Intermediate',
      tags: ['React', 'Hooks', 'Redux', 'Context API'],
      lastUpdated: '3 days ago'
    },
    {
      id: 'react-projects',
      title: 'React Projects - Build 15 Real World Applications',
      channel: 'JavaScript Mastery',
      description: 'Build 15 real-world React applications with modern tools and best practices.',
      videoCount: 45,
      totalDuration: '18 hours',
      views: '2.3M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu',
      category: 'Web Development',
      subcategory: 'React',
      level: 'Advanced',
      tags: ['React', 'Projects', 'Portfolio', 'Real World'],
      lastUpdated: '1 week ago'
    },

    // Node.js Backend Development
    {
      id: 'nodejs-complete',
      title: 'Node.js Complete Course - Backend Development',
      channel: 'The Net Ninja',
      description: 'Learn Node.js for backend development with Express, MongoDB, and authentication.',
      videoCount: 89,
      totalDuration: '16 hours',
      views: '1.8M',
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU',
      category: 'Web Development',
      subcategory: 'Node.js',
      level: 'Intermediate',
      tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
      lastUpdated: '5 days ago'
    },

    // Full Stack Development
    {
      id: 'mern-stack',
      title: 'MERN Stack Complete Course - MongoDB, Express, React, Node',
      channel: 'Traversy Media',
      description: 'Build full-stack applications using the MERN stack with authentication and deployment.',
      videoCount: 67,
      totalDuration: '22 hours',
      views: '3.5M',
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE',
      category: 'Web Development',
      subcategory: 'Full Stack',
      level: 'Advanced',
      tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node.js'],
      lastUpdated: '2 days ago'
    },

    // Vue.js Development
    {
      id: 'vuejs-complete',
      title: 'Vue.js Complete Course - Vue 3 Composition API',
      channel: 'Vue Mastery',
      description: 'Master Vue.js 3 with Composition API, Vuex, Vue Router, and modern development.',
      videoCount: 78,
      totalDuration: '14 hours',
      views: '1.1M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLC3y8-rFHvwgeQIfSDtEGVvvSEPDkL_1f',
      category: 'Web Development',
      subcategory: 'Vue.js',
      level: 'Intermediate',
      tags: ['Vue.js', 'Composition API', 'Vuex', 'Vue Router'],
      lastUpdated: '1 week ago'
    },

    // Mobile Development
    {
      id: 'react-native-complete',
      title: 'React Native Complete Course - Build Mobile Apps',
      channel: 'Academind',
      description: 'Build cross-platform mobile apps with React Native and modern development tools.',
      videoCount: 95,
      totalDuration: '20 hours',
      views: '2.1M',
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PL55RiY5tL51rrC3sh8PjEzEZKfmLuFGsm',
      category: 'Mobile Development',
      subcategory: 'React Native',
      level: 'Intermediate',
      tags: ['React Native', 'Mobile', 'Cross-platform', 'JavaScript'],
      lastUpdated: '4 days ago'
    },
    {
      id: 'flutter-complete',
      title: 'Flutter Complete Course - Dart & Mobile Development',
      channel: 'The Net Ninja',
      description: 'Learn Flutter and Dart to build beautiful mobile applications for iOS and Android.',
      videoCount: 103,
      totalDuration: '18 hours',
      views: '1.9M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ',
      category: 'Mobile Development',
      subcategory: 'Flutter',
      level: 'Beginner',
      tags: ['Flutter', 'Dart', 'Mobile', 'UI/UX'],
      lastUpdated: '6 days ago'
    },

    // Data Science & Machine Learning
    {
      id: 'machine-learning-python',
      title: 'Machine Learning with Python Complete Course',
      channel: 'freeCodeCamp.org',
      description: 'Learn machine learning algorithms and implementation using Python and scikit-learn.',
      videoCount: 67,
      totalDuration: '15 hours',
      views: '2.8M',
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s',
      category: 'AI & ML',
      subcategory: 'Machine Learning',
      level: 'Intermediate',
      tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Data Science'],
      lastUpdated: '3 days ago'
    },
    {
      id: 'tensorflow-deep-learning',
      title: 'TensorFlow Deep Learning Complete Course',
      channel: 'TensorFlow',
      description: 'Master deep learning with TensorFlow 2.0, neural networks, and computer vision.',
      videoCount: 89,
      totalDuration: '19 hours',
      views: '1.6M',
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      url: 'https://youtube.com/playlist?list=PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx',
      category: 'AI & ML',
      subcategory: 'TensorFlow',
      level: 'Advanced',
      tags: ['TensorFlow', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
      lastUpdated: '1 week ago'
    }
  ];

  const filteredPlaylists = youtubePlaylists.filter(playlist => {
    const matchesCategory = selectedCategory === 'All' || playlist.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'All' || playlist.subcategory === selectedSubcategory;
    const matchesSearch = searchTerm === '' || 
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  const openPlaylist = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg">
            <Youtube className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">YouTube Courses</h1>
            <p className="text-gray-600">Curated programming and web development playlists from top YouTube educators</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold text-gray-900">{youtubePlaylists.length}</span>
            </div>
            <p className="text-sm text-gray-600">Total Playlists</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">
                {youtubePlaylists.reduce((sum, playlist) => sum + playlist.videoCount, 0)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total Videos</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">300+</span>
            </div>
            <p className="text-sm text-gray-600">Hours of Content</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">50M+</span>
            </div>
            <p className="text-sm text-gray-600">Total Views</p>
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
              placeholder="Search YouTube courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('All');
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          {selectedCategoryData && selectedCategoryData.subcategories.length > 0 && (
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="All">All {selectedCategory}</option>
              {selectedCategoryData.subcategories.map(subcategory => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.slice(1).map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setSelectedSubcategory('All');
                }}
                className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-red-100 text-red-700 border-2 border-red-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredPlaylists.length} playlist{filteredPlaylists.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {selectedSubcategory !== 'All' && ` - ${selectedSubcategory}`}
        </p>
      </div>

      {/* Playlists Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map((playlist) => (
          <div key={playlist.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <Youtube className="h-3 w-3" />
                  <span>YouTube</span>
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(playlist.level)}`}>
                  {playlist.level}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {playlist.videoCount} videos
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => openPlaylist(playlist.url)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-red-700 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>Watch Playlist</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-red-600 font-medium">{playlist.category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">{playlist.subcategory}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{playlist.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{playlist.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{playlist.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{playlist.totalDuration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{playlist.views} views</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{playlist.channel}</span>
                  <br />
                  <span className="text-xs text-gray-500">Updated {playlist.lastUpdated}</span>
                </div>
                <button 
                  onClick={() => openPlaylist(playlist.url)}
                  className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <span className="text-sm font-medium">Watch Now</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {playlist.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {playlist.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{playlist.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPlaylists.length === 0 && (
        <div className="text-center py-12">
          <Youtube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No playlists found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Popular Channels Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Programming Channels</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'freeCodeCamp.org', 'Traversy Media', 'The Net Ninja', 'Academind',
            'Programming with Mosh', 'JavaScript Mastery', 'CodeWithHarry', 'Derek Banas'
          ].map((channel, index) => (
            <div key={index} className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Youtube className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">{channel}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeCourses;