// EdX Course API Service
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  institution: string;
  duration: string;
  level: string;
  price: string;
  rating: number;
  students: number;
  image: string;
  url: string;
  category: string;
  skills: string[];
  startDate?: string;
  language: string;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  hasMore: boolean;
  categories: string[];
}

export interface CourseFilters {
  category?: string;
  search?: string;
  level?: string;
  page?: number;
}

class CoursesAPI {
  private baseUrl: string;

  constructor() {
    // Use Supabase edge function URL
    this.baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scrape-edx-courses`;
  }

  async fetchCourses(filters: CourseFilters = {}): Promise<CoursesResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.category && filters.category !== 'All') {
        params.append('category', filters.category.toLowerCase().replace(/\s+/g, '-').replace('&', ''));
      }
      
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      if (filters.level && filters.level !== 'All') {
        params.append('level', filters.level.toLowerCase());
      }
      
      if (filters.page) {
        params.append('page', filters.page.toString());
      }

      const url = `${this.baseUrl}?${params.toString()}`;
      console.log('Fetching courses from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('API Response not OK:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('API returned error:', data.message);
        throw new Error(data.message || 'Failed to fetch courses');
      }

      console.log('Successfully fetched courses:', data.courses?.length || 0);
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      
      // Return fallback data with some sample courses
      return this.getFallbackCourses(filters);
    }
  }

  private getFallbackCourses(filters: CourseFilters = {}): CoursesResponse {
    const sampleCourses: Course[] = [
      {
        id: '1',
        title: 'Introduction to Computer Science and Programming Using Python',
        description: 'Learn computational thinking and problem solving with Python programming language.',
        instructor: 'Dr. John Guttag',
        institution: 'MIT',
        duration: '9 weeks',
        level: 'Beginner',
        price: 'Free',
        rating: 4.8,
        students: 125000,
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        url: 'https://www.edx.org/course/introduction-to-computer-science-and-programming-7',
        category: 'Programming',
        skills: ['Python', 'Programming', 'Computer Science'],
        language: 'English'
      },
      {
        id: '2',
        title: 'Machine Learning with Python',
        description: 'Learn machine learning algorithms and techniques using Python and scikit-learn.',
        instructor: 'Dr. Sarah Chen',
        institution: 'Harvard University',
        duration: '12 weeks',
        level: 'Intermediate',
        price: 'Paid',
        rating: 4.9,
        students: 89000,
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        url: 'https://www.edx.org/course/machine-learning-with-python',
        category: 'AI & ML',
        skills: ['Machine Learning', 'Python', 'Data Science'],
        language: 'English'
      },
      {
        id: '3',
        title: 'Cybersecurity Fundamentals',
        description: 'Learn the basics of cybersecurity, including network security and ethical hacking.',
        instructor: 'Prof. Michael Rodriguez',
        institution: 'Stanford University',
        duration: '8 weeks',
        level: 'Beginner',
        price: 'Free',
        rating: 4.7,
        students: 67000,
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        url: 'https://www.edx.org/course/cybersecurity-fundamentals',
        category: 'Cybersecurity',
        skills: ['Network Security', 'Ethical Hacking', 'Cybersecurity'],
        language: 'English'
      },
      {
        id: '4',
        title: 'Introduction to Cloud Computing',
        description: 'Learn cloud computing concepts, AWS services, and cloud architecture patterns.',
        instructor: 'Dr. Jennifer Liu',
        institution: 'UC Berkeley',
        duration: '10 weeks',
        level: 'Intermediate',
        price: 'Paid',
        rating: 4.6,
        students: 45000,
        image: 'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        url: 'https://www.edx.org/course/introduction-to-cloud-computing',
        category: 'Cloud Computing',
        skills: ['AWS', 'Cloud Architecture', 'DevOps'],
        language: 'English'
      },
      {
        id: '5',
        title: 'Full Stack Web Development',
        description: 'Build modern web applications using React, Node.js, and MongoDB.',
        instructor: 'David Kim',
        institution: 'University of Washington',
        duration: '16 weeks',
        level: 'Intermediate',
        price: 'Paid',
        rating: 4.8,
        students: 78000,
        image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        url: 'https://www.edx.org/course/full-stack-web-development',
        category: 'Web Development',
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        language: 'English'
      },
      {
        id: '6',
        title: 'Data Science with R',
        description: 'Learn data analysis, visualization, and statistical modeling using R programming.',
        instructor: 'Prof. Emma Thompson',
        institution: 'Johns Hopkins University',
        duration: '14 weeks',
        level: 'Intermediate',
        price: 'Free',
        rating: 4.5,
        students: 92000,
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        url: 'https://www.edx.org/course/data-science-with-r',
        category: 'Data Science',
        skills: ['R Programming', 'Statistics', 'Data Visualization'],
        language: 'English'
      }
    ];

    // Filter courses based on criteria
    let filteredCourses = sampleCourses;

    if (filters.category && filters.category !== 'All') {
      filteredCourses = filteredCourses.filter(course => 
        course.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.level && filters.level !== 'All') {
      filteredCourses = filteredCourses.filter(course =>
        course.level.toLowerCase() === filters.level!.toLowerCase()
      );
    }

    return {
      courses: filteredCourses,
      total: filteredCourses.length,
      page: filters.page || 1,
      hasMore: false,
      categories: [
        'Programming',
        'AI & ML',
        'Data Science',
        'Cybersecurity',
        'Cloud Computing',
        'Web Development',
        'Mobile Development',
        'Business',
        'Design',
        'Mathematics'
      ]
    };
  }

  async searchCourses(query: string): Promise<Course[]> {
    const response = await this.fetchCourses({ search: query });
    return response.courses;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    const response = await this.fetchCourses({ category });
    return response.courses;
  }
}

export const coursesAPI = new CoursesAPI();