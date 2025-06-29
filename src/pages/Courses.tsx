import React, { useState } from 'react';
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
  Globe
} from 'lucide-react';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

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

  const courses = [
    {
      id: 1,
      title: 'Complete Python Programming Bootcamp',
      category: 'Programming',
      level: 'Beginner',
      rating: 4.8,
      students: 15420,
      duration: '40 hours',
      price: 'Free',
      instructor: 'Dr. Sarah Johnson',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Master Python from basics to advanced concepts with hands-on projects.',
      lessons: 156,
      quizzes: 25,
      labs: 12
    },
    {
      id: 2,
      title: 'Machine Learning with TensorFlow',
      category: 'AI & ML',
      level: 'Intermediate',
      rating: 4.9,
      students: 8930,
      duration: '60 hours',
      price: 'Premium',
      instructor: 'Prof. Michael Chen',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Build and deploy ML models using TensorFlow and Python.',
      lessons: 89,
      quizzes: 18,
      labs: 20
    },
    {
      id: 3,
      title: 'Ethical Hacking & Penetration Testing',
      category: 'Cybersecurity',
      level: 'Advanced',
      rating: 4.7,
      students: 5670,
      duration: '80 hours',
      price: 'Premium',
      instructor: 'Alex Rodriguez',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Learn ethical hacking techniques and cybersecurity best practices.',
      lessons: 112,
      quizzes: 30,
      labs: 35
    },
    {
      id: 4,
      title: 'AWS Cloud Solutions Architecture',
      category: 'Cloud Computing',
      level: 'Intermediate',
      rating: 4.8,
      students: 12300,
      duration: '50 hours',
      price: 'Free',
      instructor: 'Jennifer Liu',
      image: 'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Design and implement scalable cloud solutions on AWS.',
      lessons: 78,
      quizzes: 20,
      labs: 15
    },
    {
      id: 5,
      title: 'React & Next.js Full-Stack Development',
      category: 'Web Development',
      level: 'Intermediate',
      rating: 4.9,
      students: 18750,
      duration: '45 hours',
      price: 'Premium',
      instructor: 'David Kim',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Build modern web applications with React and Next.js.',
      lessons: 95,
      quizzes: 22,
      labs: 18
    },
    {
      id: 6,
      title: 'iOS App Development with Swift',
      category: 'Mobile Development',
      level: 'Beginner',
      rating: 4.6,
      students: 7890,
      duration: '55 hours',
      price: 'Premium',
      instructor: 'Emma Thompson',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Create native iOS applications using Swift and Xcode.',
      lessons: 102,
      quizzes: 28,
      labs: 25
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
        <p className="text-gray-600">Master technology skills with our comprehensive course library</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
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
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {categories.slice(1).map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-1" />
                <span className="text-xs font-medium">{category.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {selectedLevel !== 'All' && ` for ${selectedLevel} level`}
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  course.price === 'Free' 
                    ? 'bg-accent-100 text-accent-700' 
                    : 'bg-primary-100 text-primary-700'
                }`}>
                  {course.price}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {course.level}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                  <Play className="h-4 w-4" />
                  <span>Start Learning</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-primary-600 font-medium">{course.category}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
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

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <button className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                  <span className="text-sm font-medium">View Details</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{course.lessons} lessons</span>
                  <span>{course.quizzes} quizzes</span>
                  <span>{course.labs} labs</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Courses;