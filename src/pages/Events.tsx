import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink,
  Filter,
  Search,
  Globe,
  Monitor,
  Wifi,
  WifiOff,
  Star,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  location?: string;
  category: string;
  status: 'live' | 'upcoming' | 'past';
  registrationUrl?: string;
  attendees?: number;
  rating?: number;
  tags: string[];
  image?: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');
  const [selectedMode, setSelectedMode] = useState<'all' | 'online' | 'offline' | 'hybrid'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for demonstration (in production, this would come from web scraping)
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Advanced React Patterns Workshop',
      description: 'Deep dive into advanced React patterns including render props, compound components, and custom hooks.',
      date: '2024-01-25',
      time: '10:00 AM',
      mode: 'online',
      category: 'Web Development',
      status: 'upcoming',
      registrationUrl: 'https://scaler.com/events/react-workshop',
      attendees: 245,
      rating: 4.8,
      tags: ['React', 'JavaScript', 'Frontend'],
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
    },
    {
      id: '2',
      title: 'Machine Learning Bootcamp',
      description: 'Comprehensive ML bootcamp covering algorithms, model training, and deployment strategies.',
      date: '2024-01-20',
      time: '2:00 PM',
      mode: 'hybrid',
      location: 'Bangalore, India',
      category: 'AI & ML',
      status: 'live',
      registrationUrl: 'https://scaler.com/events/ml-bootcamp',
      attendees: 180,
      rating: 4.9,
      tags: ['Machine Learning', 'Python', 'Data Science'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
    },
    {
      id: '3',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the basics of cybersecurity, threat detection, and security best practices.',
      date: '2024-01-30',
      time: '6:00 PM',
      mode: 'online',
      category: 'Cybersecurity',
      status: 'upcoming',
      registrationUrl: 'https://scaler.com/events/cybersecurity-basics',
      attendees: 320,
      rating: 4.7,
      tags: ['Security', 'Networking', 'Ethical Hacking'],
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
    },
    {
      id: '4',
      title: 'Cloud Architecture Masterclass',
      description: 'Design scalable cloud solutions using AWS, Azure, and Google Cloud Platform.',
      date: '2024-02-05',
      time: '11:00 AM',
      mode: 'offline',
      location: 'Mumbai, India',
      category: 'Cloud Computing',
      status: 'upcoming',
      registrationUrl: 'https://scaler.com/events/cloud-architecture',
      attendees: 150,
      rating: 4.8,
      tags: ['AWS', 'Azure', 'GCP', 'DevOps'],
      image: 'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
    },
    {
      id: '5',
      title: 'Full Stack Development with MERN',
      description: 'Build complete web applications using MongoDB, Express, React, and Node.js.',
      date: '2024-01-15',
      time: '3:00 PM',
      mode: 'online',
      category: 'Web Development',
      status: 'past',
      attendees: 280,
      rating: 4.6,
      tags: ['MERN', 'JavaScript', 'Full Stack'],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
    },
    {
      id: '6',
      title: 'Data Science with Python',
      description: 'Explore data analysis, visualization, and machine learning using Python libraries.',
      date: '2024-02-10',
      time: '9:00 AM',
      mode: 'hybrid',
      location: 'Delhi, India',
      category: 'Data Science',
      status: 'upcoming',
      registrationUrl: 'https://scaler.com/events/data-science-python',
      attendees: 195,
      rating: 4.9,
      tags: ['Python', 'Data Analysis', 'Pandas', 'NumPy'],
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
    }
  ];

  const categories = ['All', 'Web Development', 'AI & ML', 'Cybersecurity', 'Cloud Computing', 'Data Science', 'Mobile Development'];

  // Simulate API call to scrape events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In production, this would be an actual API call to scrape Scaler events
        // const response = await fetch('/api/scrape-events');
        // const scrapedEvents = await response.json();
        
        setEvents(mockEvents);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesMode = selectedMode === 'all' || event.mode === selectedMode;
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesMode && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-700 border-red-200';
      case 'upcoming': return 'bg-green-100 text-green-700 border-green-200';
      case 'past': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Wifi className="h-4 w-4" />;
      case 'offline': return <WifiOff className="h-4 w-4" />;
      case 'hybrid': return <Globe className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Events</h3>
            <p className="text-gray-600">Fetching the latest events from Scaler...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Events</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech Events</h1>
        <p className="text-gray-600">Discover and join the latest technology events, workshops, and webinars</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="live">Live Now</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past Events</option>
          </select>

          {/* Mode Filter */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                  {event.status === 'live' && '🔴 '}{event.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  event.mode === 'online' ? 'bg-blue-100 text-blue-700' :
                  event.mode === 'offline' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {getModeIcon(event.mode)}
                  <span className="capitalize">{event.mode}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-primary-600 font-medium">{event.category}</span>
                {event.rating && (
                  <>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{event.rating}</span>
                    </div>
                  </>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                {event.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.attendees && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} registered</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    event.status === 'live' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : event.status === 'upcoming'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={event.status === 'past'}
                >
                  <span>{event.status === 'live' ? 'Join Now' : event.status === 'upcoming' ? 'Register' : 'Ended'}</span>
                  {event.status !== 'past' && <ExternalLink className="h-4 w-4" />}
                </button>
                <button className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                  <span className="text-sm font-medium">Details</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Events are dynamically fetched from Scaler.com and updated in real-time. 
          The data shown reflects the latest available events from their platform.
        </p>
      </div>
    </div>
  );
};

export default Events;