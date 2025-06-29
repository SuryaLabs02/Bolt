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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Failed to fetch courses');
      }

      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      
      // Return fallback data in case of error
      return {
        courses: [],
        total: 0,
        page: 1,
        hasMore: false,
        categories: [
          'Programming',
          'Data Science', 
          'Business',
          'Engineering',
          'AI & ML',
          'Cybersecurity',
          'Web Development',
          'Mathematics',
          'Design'
        ]
      };
    }
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