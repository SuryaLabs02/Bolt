import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Play,
  ChevronRight,
  BookOpen,
  Code,
  Database,
  Shield,
  Cloud,
  Cpu,
  Smartphone,
  Gamepad2,
  Bitcoin,
  Globe,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { coursesAPI, Course, CourseFilters } from '../services/coursesApi';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const categoryIcons: { [key: string]: any } = {
    'All': BookOpen,
    'Programming': Code,
    'AI & ML': Cpu,
    'Data Science': Database,
    'Cybersecurity': Shield,
    'Cloud Computing': Cloud,
    'Web Development': Globe,
    'Mobile Development': Smartphone,
    'Game Development': Gamepad2,
    'Blockchain': Bitcoin,
    'Business': BookOpen,
    'Engineering': Code,
    'Mathematics': Database,
    'Design': Globe
  };

  // Category-specific thumbnail mappings
  const getCategoryThumbnail = (category: string, title: string) => {
    const categoryThumbnails: { [key: string]: string[] } = {
      'Programming': [
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'AI & ML': [
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8439094/pexels-photo-8439094.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Data Science': [
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Cybersecurity': [
        'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5483078/pexels-photo-5483078.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Cloud Computing': [
        'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181356/pexels-photo-1181356.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Web Development': [
        'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/11035539/pexels-photo-11035539.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/11035541/pexels-photo-11035541.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Mobile Development': [
        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Game Development': [
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/442575/pexels-photo-442575.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/371925/pexels-photo-371925.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/442574/pexels-photo-442574.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Blockchain': [
        'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/315788/pexels-photo-315788.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1447418/pexels-photo-1447418.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1447419/pexels-photo-1447419.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Business': [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Design': [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/196647/pexels-photo-196647.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/196648/pexels-photo-196648.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ]
    };

    const categoryImages = categoryThumbnails[category] || categoryThumbnails['Programming'];
    // Use title hash to consistently select the same image for the same course
    const titleHash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const imageIndex = Math.abs(titleHash) % categoryImages.length;
    return categoryImages[imageIndex];
  };

  // Fetch courses when filters change
  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedLevel, currentPage]);

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== '') {
        fetchCourses();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: CourseFilters = {
        category: selectedCategory,
        level: selectedLevel,
        page: currentPage,
        search: searchTerm
      };

      const response = await coursesAPI.fetchCourses(filters);
      
      // Add category-specific thumbnails to courses
      const coursesWithThumbnails = response.courses.map(course => ({
        ...course,
        image: getCategoryThumbnail(course.category, course.title)
      }));
      
      setCourses(coursesWithThumbnails);
      setTotalCourses(response.total);
      setHasMore(response.hasMore);
      setCategories(['All', ...response.categories]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  };

  const openCourse = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'introductory':
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

  const getPriceColor = (price: string) => {
    switch (price.toLowerCase()) {
      case 'free':
        return 'bg-green-100 text-green-700';
      case 'paid':
        return 'bg-blue-100 text-blue-700';
      case 'credit':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
            <p className="text-gray-600">Discover courses from edX - Real-time data from leading universities</p>
          </div>
          <button
            onClick={() => fetchCourses()}
            disabled={loading}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses from edX..."
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
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {categories.slice(1).map((category) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-1" />
                <span className="text-xs font-medium">{category.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          {loading ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading courses from edX...</span>
            </span>
          ) : (
            <>
              Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
              {totalCourses > 0 && ` of ${totalCourses.toLocaleString()}`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedLevel !== 'All' && ` for ${selectedLevel} level`}
            </>
          )}
        </p>
        
        {!loading && courses.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data from edX</span>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="text-red-800 font-medium">Error loading courses</h3>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => fetchCourses()}
                className="text-red-600 hover:text-red-800 text-sm underline mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Courses Grid */}
      {!loading && courses.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getCategoryThumbnail(course.category, course.title);
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriceColor(course.price)}`}>
                    {course.price}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => openCourse(course.url)}
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View on edX</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-primary-600 font-medium">{course.category}</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{course.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{course.instructor}</span>
                    <br />
                    <span className="text-xs text-gray-500">{course.institution}</span>
                  </div>
                  <button 
                    onClick={() => openCourse(course.url)}
                    className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                  >
                    <span className="text-sm font-medium">View Course</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>

                {course.skills.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{course.skills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && courses.length === 0 && !error && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && courses.length > 0 && hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Load More Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;