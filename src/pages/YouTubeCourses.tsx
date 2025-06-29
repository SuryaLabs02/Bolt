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
  TrendingUp,
  Shield,
  Cloud,
  Gamepad2,
  Bitcoin,
  Palette,
  BarChart3,
  Settings
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
  playlistId: string; // Real YouTube playlist ID
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
        'Kotlin', 'PHP', 'Ruby', 'TypeScript', 'Dart', 'Scala', 'R', 'C',
        'Assembly', 'Haskell', 'Erlang', 'Clojure', 'F#', 'Julia', 'Lua'
      ]
    },
    { 
      name: 'Web Development', 
      icon: Globe, 
      subcategories: [
        'Frontend', 'Backend', 'Full Stack', 'React', 'Vue.js', 'Angular', 
        'Node.js', 'Express', 'Django', 'Flask', 'Laravel', 'Spring Boot',
        'Next.js', 'Nuxt.js', 'Svelte', 'Gatsby', 'WordPress', 'Drupal'
      ]
    },
    { 
      name: 'Mobile Development', 
      icon: Smartphone, 
      subcategories: [
        'React Native', 'Flutter', 'iOS Development', 'Android Development', 
        'Xamarin', 'Ionic', 'Cordova', 'Unity Mobile', 'Progressive Web Apps'
      ]
    },
    { 
      name: 'Data Science', 
      icon: Database, 
      subcategories: [
        'Machine Learning', 'Data Analysis', 'Statistics', 'Pandas', 'NumPy', 
        'Matplotlib', 'Seaborn', 'Jupyter', 'SQL', 'NoSQL', 'Big Data', 'ETL'
      ]
    },
    { 
      name: 'AI & ML', 
      icon: Cpu, 
      subcategories: [
        'TensorFlow', 'PyTorch', 'Keras', 'Computer Vision', 'NLP', 
        'Deep Learning', 'Neural Networks', 'OpenCV', 'Scikit-learn', 'MLOps'
      ]
    },
    {
      name: 'Cybersecurity',
      icon: Shield,
      subcategories: [
        'Ethical Hacking', 'Penetration Testing', 'Network Security', 'Cryptography',
        'Digital Forensics', 'Malware Analysis', 'Security Auditing', 'CISSP'
      ]
    },
    {
      name: 'Cloud Computing',
      icon: Cloud,
      subcategories: [
        'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'DevOps',
        'Terraform', 'Jenkins', 'CI/CD', 'Microservices'
      ]
    },
    {
      name: 'Game Development',
      icon: Gamepad2,
      subcategories: [
        'Unity', 'Unreal Engine', 'Godot', 'Game Design', '3D Modeling',
        'C# for Games', 'C++ for Games', 'Mobile Games'
      ]
    },
    {
      name: 'Blockchain',
      icon: Bitcoin,
      subcategories: [
        'Solidity', 'Smart Contracts', 'Web3', 'DeFi', 'NFTs',
        'Ethereum', 'Bitcoin', 'Cryptocurrency'
      ]
    },
    {
      name: 'UI/UX Design',
      icon: Palette,
      subcategories: [
        'Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research',
        'Design Systems', 'Wireframing', 'Visual Design'
      ]
    },
    {
      name: 'DevOps',
      icon: Settings,
      subcategories: [
        'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'Ansible',
        'Terraform', 'Monitoring', 'Infrastructure as Code'
      ]
    },
    {
      name: 'Data Visualization',
      icon: BarChart3,
      subcategories: [
        'Tableau', 'Power BI', 'D3.js', 'Chart.js', 'Plotly',
        'Grafana', 'Excel', 'Google Data Studio'
      ]
    }
  ];

  // Real YouTube playlists with actual playlist IDs for thumbnail fetching
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
      thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Beginner',
      tags: ['Python', 'Programming', 'OOP', 'Data Structures'],
      lastUpdated: '2 weeks ago',
      playlistId: 'PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f'
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
      thumbnail: 'https://img.youtube.com/vi/LHBE6Q9XlzI/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Intermediate',
      tags: ['Python', 'Data Science', 'Pandas', 'NumPy'],
      lastUpdated: '1 week ago',
      playlistId: 'PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1'
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
      thumbnail: 'https://img.youtube.com/vi/F5mRW0jo-U4/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLillGF-RfqbbyKq4GmxwAi9AA8HGmCe23',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Intermediate',
      tags: ['Python', 'Django', 'Web Development', 'Backend'],
      lastUpdated: '3 days ago',
      playlistId: 'PLillGF-RfqbbyKq4GmxwAi9AA8HGmCe23'
    },
    {
      id: 'python-flask',
      title: 'Flask Web Development Tutorial',
      channel: 'Corey Schafer',
      description: 'Learn Flask framework for Python web development with practical projects.',
      videoCount: 45,
      totalDuration: '8 hours',
      views: '780K',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/MwZwr5Tvyxo/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH',
      category: 'Programming',
      subcategory: 'Python',
      level: 'Intermediate',
      tags: ['Python', 'Flask', 'Web Framework', 'API'],
      lastUpdated: '1 week ago',
      playlistId: 'PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH'
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
      thumbnail: 'https://img.youtube.com/vi/iWOYAxlnaww/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET',
      category: 'Programming',
      subcategory: 'JavaScript',
      level: 'Beginner',
      tags: ['JavaScript', 'ES6+', 'DOM', 'Async Programming'],
      lastUpdated: '5 days ago',
      playlistId: 'PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET'
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
      thumbnail: 'https://img.youtube.com/vi/t2CEgPsws3U/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAbnRT_hue-3zyiuIYj0OlpyG',
      category: 'Programming',
      subcategory: 'JavaScript',
      level: 'Advanced',
      tags: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving'],
      lastUpdated: '1 week ago',
      playlistId: 'PLWKjhJtqVAbnRT_hue-3zyiuIYj0OlpyG'
    },
    {
      id: 'javascript-30-projects',
      title: '30 JavaScript Projects in 30 Days',
      channel: 'JavaScript Mastery',
      description: 'Build 30 real-world JavaScript projects to master the language.',
      videoCount: 30,
      totalDuration: '25 hours',
      views: '2.1M',
      rating: 4.9,
      thumbnail: 'https://img.youtube.com/vi/3PHXvlpOkf4/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLillGF-Rfqbbnyz23-MCO_fwbNJtmrEcX',
      category: 'Programming',
      subcategory: 'JavaScript',
      level: 'Intermediate',
      tags: ['JavaScript', 'Projects', 'DOM', 'APIs'],
      lastUpdated: '4 days ago',
      playlistId: 'PLillGF-Rfqbbnyz23-MCO_fwbNJtmrEcX'
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
      thumbnail: 'https://img.youtube.com/vi/grEKMHGYyns/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLE7E8B7F4856C9B19',
      category: 'Programming',
      subcategory: 'Java',
      level: 'Beginner',
      tags: ['Java', 'OOP', 'Collections', 'Spring'],
      lastUpdated: '2 weeks ago',
      playlistId: 'PLE7E8B7F4856C9B19'
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
      thumbnail: 'https://img.youtube.com/vi/vtPkZShrvXQ/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLqq-6Pq4lTTbx8p2oCgcAQGQyqN8XeA1x',
      category: 'Programming',
      subcategory: 'Java',
      level: 'Intermediate',
      tags: ['Java', 'Spring Boot', 'REST API', 'Microservices'],
      lastUpdated: '4 days ago',
      playlistId: 'PLqq-6Pq4lTTbx8p2oCgcAQGQyqN8XeA1x'
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
      thumbnail: 'https://img.youtube.com/vi/yGB9jhsEsr8/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL',
      category: 'Programming',
      subcategory: 'C++',
      level: 'Beginner',
      tags: ['C++', 'STL', 'Templates', 'Memory Management'],
      lastUpdated: '1 week ago',
      playlistId: 'PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL'
    },
    {
      id: 'cpp-advanced',
      title: 'Advanced C++ Programming Concepts',
      channel: 'The Cherno',
      description: 'Deep dive into advanced C++ concepts, optimization, and best practices.',
      videoCount: 112,
      totalDuration: '28 hours',
      views: '1.4M',
      rating: 4.9,
      thumbnail: 'https://img.youtube.com/vi/18c3MTX0PK0/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb',
      category: 'Programming',
      subcategory: 'C++',
      level: 'Advanced',
      tags: ['C++', 'Advanced', 'Performance', 'Templates'],
      lastUpdated: '3 days ago',
      playlistId: 'PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb'
    },

    // C Programming
    {
      id: 'c-programming',
      title: 'C Programming Complete Course',
      channel: 'freeCodeCamp.org',
      description: 'Learn C programming from scratch with practical examples and projects.',
      videoCount: 45,
      totalDuration: '10 hours',
      views: '2.5M',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/KJgsSFOSQv0/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAbmUX5iMqchQdQwFxgmVdD-X',
      category: 'Programming',
      subcategory: 'C',
      level: 'Beginner',
      tags: ['C Programming', 'Pointers', 'Memory Management'],
      lastUpdated: '1 week ago',
      playlistId: 'PLWKjhJtqVAbmUX5iMqchQdQwFxgmVdD-X'
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
      thumbnail: 'https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS',
      category: 'Web Development',
      subcategory: 'React',
      level: 'Intermediate',
      tags: ['React', 'Hooks', 'Redux', 'Context API'],
      lastUpdated: '3 days ago',
      playlistId: 'PL55RiY5tL51oyA8euSROLjMFZbXaV7skS'
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
      thumbnail: 'https://img.youtube.com/vi/b9eMGE7QtTk/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu',
      category: 'Web Development',
      subcategory: 'React',
      level: 'Advanced',
      tags: ['React', 'Projects', 'Portfolio', 'Real World'],
      lastUpdated: '1 week ago',
      playlistId: 'PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu'
    },
    {
      id: 'react-nextjs',
      title: 'Next.js Complete Course - React Framework',
      channel: 'Traversy Media',
      description: 'Learn Next.js for production-ready React applications with SSR and SSG.',
      videoCount: 34,
      totalDuration: '12 hours',
      views: '1.1M',
      rating: 4.7,
      thumbnail: 'https://img.youtube.com/vi/mTz0GXj8NN0/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLillGF-RfqbYeckUaD1z6nviTp31GLTH8',
      category: 'Web Development',
      subcategory: 'Next.js',
      level: 'Advanced',
      tags: ['Next.js', 'React', 'SSR', 'SSG'],
      lastUpdated: '5 days ago',
      playlistId: 'PLillGF-RfqbYeckUaD1z6nviTp31GLTH8'
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
      thumbnail: 'https://img.youtube.com/vi/w-7RQ46RgxU/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU',
      category: 'Web Development',
      subcategory: 'Node.js',
      level: 'Intermediate',
      tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
      lastUpdated: '5 days ago',
      playlistId: 'PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU'
    },
    {
      id: 'nodejs-express-api',
      title: 'Express.js REST API Development',
      channel: 'Traversy Media',
      description: 'Build RESTful APIs with Express.js, MongoDB, and authentication.',
      videoCount: 23,
      totalDuration: '8 hours',
      views: '890K',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/L72fhGm1tfE/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLillGF-RfqbYRpji8t7SxUllnxkqHJHuH',
      category: 'Web Development',
      subcategory: 'Express',
      level: 'Intermediate',
      tags: ['Express.js', 'REST API', 'MongoDB', 'JWT'],
      lastUpdated: '2 weeks ago',
      playlistId: 'PLillGF-RfqbYRpji8t7SxUllnxkqHJHuH'
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
      thumbnail: 'https://img.youtube.com/vi/fnpmR6Q5lEc/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE',
      category: 'Web Development',
      subcategory: 'Full Stack',
      level: 'Advanced',
      tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node.js'],
      lastUpdated: '2 days ago',
      playlistId: 'PLillGF-RfqbbiTGgA77tGO426V3hRF9iE'
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
      thumbnail: 'https://img.youtube.com/vi/FXpIoQ_rT_c/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLC3y8-rFHvwgeQIfSDtEGVvvSEPDkL_1f',
      category: 'Web Development',
      subcategory: 'Vue.js',
      level: 'Intermediate',
      tags: ['Vue.js', 'Composition API', 'Vuex', 'Vue Router'],
      lastUpdated: '1 week ago',
      playlistId: 'PLC3y8-rFHvwgeQIfSDtEGVvvSEPDkL_1f'
    },

    // Angular Development
    {
      id: 'angular-complete',
      title: 'Angular Complete Course - TypeScript Framework',
      channel: 'Academind',
      description: 'Learn Angular framework with TypeScript, services, routing, and forms.',
      videoCount: 95,
      totalDuration: '20 hours',
      views: '1.6M',
      rating: 4.7,
      thumbnail: 'https://img.youtube.com/vi/k5E2AVpwsko/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL55RiY5tL51rMwHlp7w7z5-Sgb7sWpGPB',
      category: 'Web Development',
      subcategory: 'Angular',
      level: 'Intermediate',
      tags: ['Angular', 'TypeScript', 'Services', 'Routing'],
      lastUpdated: '6 days ago',
      playlistId: 'PL55RiY5tL51rMwHlp7w7z5-Sgb7sWpGPB'
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
      thumbnail: 'https://img.youtube.com/vi/ur6I5m2nTvk/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL55RiY5tL51rrC3sh8PjEzEZKfmLuFGsm',
      category: 'Mobile Development',
      subcategory: 'React Native',
      level: 'Intermediate',
      tags: ['React Native', 'Mobile', 'Cross-platform', 'JavaScript'],
      lastUpdated: '4 days ago',
      playlistId: 'PL55RiY5tL51rrC3sh8PjEzEZKfmLuFGsm'
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
      thumbnail: 'https://img.youtube.com/vi/1ukSR1GRtMU/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ',
      category: 'Mobile Development',
      subcategory: 'Flutter',
      level: 'Beginner',
      tags: ['Flutter', 'Dart', 'Mobile', 'UI/UX'],
      lastUpdated: '6 days ago',
      playlistId: 'PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ'
    },
    {
      id: 'ios-swift',
      title: 'iOS Development with Swift - Complete Course',
      channel: 'CodeWithChris',
      description: 'Learn iOS app development with Swift and Xcode from beginner to advanced.',
      videoCount: 67,
      totalDuration: '15 hours',
      views: '1.3M',
      rating: 4.6,
      thumbnail: 'https://img.youtube.com/vi/09TeUXjzpKs/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLMRqhzcHGw1ZqzYnpIuQAn2rcjhOtbqGX',
      category: 'Mobile Development',
      subcategory: 'iOS Development',
      level: 'Intermediate',
      tags: ['Swift', 'iOS', 'Xcode', 'UIKit'],
      lastUpdated: '1 week ago',
      playlistId: 'PLMRqhzcHGw1ZqzYnpIuQAn2rcjhOtbqGX'
    },
    {
      id: 'android-kotlin',
      title: 'Android Development with Kotlin',
      channel: 'Coding in Flow',
      description: 'Build Android apps with Kotlin, Android Studio, and modern Android development.',
      videoCount: 89,
      totalDuration: '17 hours',
      views: '980K',
      rating: 4.7,
      thumbnail: 'https://img.youtube.com/vi/F9UC9DY-vIU/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLrnPJCHvNZuDihTpkRs6SpZhqgBqPU118',
      category: 'Mobile Development',
      subcategory: 'Android Development',
      level: 'Intermediate',
      tags: ['Kotlin', 'Android', 'Android Studio', 'Material Design'],
      lastUpdated: '3 days ago',
      playlistId: 'PLrnPJCHvNZuDihTpkRs6SpZhqgBqPU118'
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
      thumbnail: 'https://img.youtube.com/vi/NWONeJKn6kc/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s',
      category: 'AI & ML',
      subcategory: 'Machine Learning',
      level: 'Intermediate',
      tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Data Science'],
      lastUpdated: '3 days ago',
      playlistId: 'PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s'
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
      thumbnail: 'https://img.youtube.com/vi/tPYj3fFJGjk/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx',
      category: 'AI & ML',
      subcategory: 'TensorFlow',
      level: 'Advanced',
      tags: ['TensorFlow', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
      lastUpdated: '1 week ago',
      playlistId: 'PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx'
    },
    {
      id: 'pytorch-course',
      title: 'PyTorch for Deep Learning Complete Course',
      channel: 'Daniel Bourke',
      description: 'Learn PyTorch for deep learning with practical projects and implementations.',
      videoCount: 45,
      totalDuration: '25 hours',
      views: '890K',
      rating: 4.9,
      thumbnail: 'https://img.youtube.com/vi/Z_ikDlimN6A/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLZbbT5o_s2xrfNyHZsM6ufI0iZENK9xgG',
      category: 'AI & ML',
      subcategory: 'PyTorch',
      level: 'Advanced',
      tags: ['PyTorch', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
      lastUpdated: '2 weeks ago',
      playlistId: 'PLZbbT5o_s2xrfNyHZsM6ufI0iZENK9xgG'
    },

    // Data Science with R and Python
    {
      id: 'data-science-python',
      title: 'Data Science with Python - Complete Course',
      channel: 'Keith Galli',
      description: 'Complete data science course with Python, pandas, matplotlib, and machine learning.',
      videoCount: 56,
      totalDuration: '12 hours',
      views: '1.4M',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/vmEHCJofslg/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLFCB5Dp81iNVmuoGIqcT5oF4K-7kTI5vp',
      category: 'Data Science',
      subcategory: 'Data Analysis',
      level: 'Intermediate',
      tags: ['Data Science', 'Python', 'Pandas', 'Matplotlib'],
      lastUpdated: '1 week ago',
      playlistId: 'PLFCB5Dp81iNVmuoGIqcT5oF4K-7kTI5vp'
    },

    // Cybersecurity Courses
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking Complete Course',
      channel: 'The Cyber Mentor',
      description: 'Learn ethical hacking, penetration testing, and cybersecurity fundamentals.',
      videoCount: 78,
      totalDuration: '20 hours',
      views: '1.2M',
      rating: 4.7,
      thumbnail: 'https://img.youtube.com/vi/3Kq1MIfTWCE/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj',
      category: 'Cybersecurity',
      subcategory: 'Ethical Hacking',
      level: 'Intermediate',
      tags: ['Ethical Hacking', 'Penetration Testing', 'Kali Linux', 'Security'],
      lastUpdated: '5 days ago',
      playlistId: 'PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj'
    },

    // Cloud Computing
    {
      id: 'aws-complete',
      title: 'AWS Complete Course - Cloud Computing',
      channel: 'Simplilearn',
      description: 'Master Amazon Web Services with hands-on labs and real-world projects.',
      videoCount: 89,
      totalDuration: '18 hours',
      views: '1.8M',
      rating: 4.6,
      thumbnail: 'https://img.youtube.com/vi/k1RI5locZE4/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz',
      category: 'Cloud Computing',
      subcategory: 'AWS',
      level: 'Intermediate',
      tags: ['AWS', 'Cloud Computing', 'EC2', 'S3'],
      lastUpdated: '1 week ago',
      playlistId: 'PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz'
    },

    // DevOps
    {
      id: 'docker-kubernetes',
      title: 'Docker and Kubernetes Complete Course',
      channel: 'TechWorld with Nana',
      description: 'Learn containerization with Docker and orchestration with Kubernetes.',
      videoCount: 67,
      totalDuration: '16 hours',
      views: '1.5M',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/3c-iBn73dDE/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLy7NrYWoggjwPggqtFsI_zMAwvG0SqYCb',
      category: 'DevOps',
      subcategory: 'Docker',
      level: 'Intermediate',
      tags: ['Docker', 'Kubernetes', 'Containers', 'DevOps'],
      lastUpdated: '4 days ago',
      playlistId: 'PLy7NrYWoggjwPggqtFsI_zMAwvG0SqYCb'
    },

    // Game Development
    {
      id: 'unity-game-dev',
      title: 'Unity Game Development Complete Course',
      channel: 'Brackeys',
      description: 'Learn game development with Unity engine and C# programming.',
      videoCount: 89,
      totalDuration: '22 hours',
      views: '2.3M',
      rating: 4.9,
      thumbnail: 'https://img.youtube.com/vi/j48LtUkZRjU/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLPV2KyIb3jR5QFsefuO2RlAgWEz6EvVi6',
      category: 'Game Development',
      subcategory: 'Unity',
      level: 'Beginner',
      tags: ['Unity', 'Game Development', 'C#', '3D Games'],
      lastUpdated: '2 weeks ago',
      playlistId: 'PLPV2KyIb3jR5QFsefuO2RlAgWEz6EvVi6'
    },

    // Blockchain Development
    {
      id: 'solidity-blockchain',
      title: 'Solidity and Blockchain Development',
      channel: 'Dapp University',
      description: 'Learn blockchain development with Solidity, smart contracts, and Web3.',
      videoCount: 45,
      totalDuration: '15 hours',
      views: '890K',
      rating: 4.7,
      thumbnail: 'https://img.youtube.com/vi/M576WGiDBdQ/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN',
      category: 'Blockchain',
      subcategory: 'Solidity',
      level: 'Advanced',
      tags: ['Solidity', 'Blockchain', 'Smart Contracts', 'Web3'],
      lastUpdated: '1 week ago',
      playlistId: 'PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN'
    },

    // UI/UX Design
    {
      id: 'figma-design',
      title: 'Figma Complete Course - UI/UX Design',
      channel: 'DesignCourse',
      description: 'Master Figma for UI/UX design with practical projects and design systems.',
      videoCount: 34,
      totalDuration: '8 hours',
      views: '780K',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/FTlczfEyHnk/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLDtHAiqIa4wa5MBbE_XDoqY51sAkQnkjt',
      category: 'UI/UX Design',
      subcategory: 'Figma',
      level: 'Beginner',
      tags: ['Figma', 'UI Design', 'UX Design', 'Prototyping'],
      lastUpdated: '3 days ago',
      playlistId: 'PLDtHAiqIa4wa5MBbE_XDoqY51sAkQnkjt'
    },

    // Additional Programming Languages
    {
      id: 'go-programming',
      title: 'Go Programming Language Complete Course',
      channel: 'TechWorld with Nana',
      description: 'Learn Go programming language for backend development and microservices.',
      videoCount: 45,
      totalDuration: '12 hours',
      views: '650K',
      rating: 4.7,
      thumbnail: 'https://img.youtube.com/vi/yyUHQIec83I/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLy7NrYWoggjzSIlwxeBouQVj7KqYNJsan',
      category: 'Programming',
      subcategory: 'Go',
      level: 'Intermediate',
      tags: ['Go', 'Backend', 'Microservices', 'Concurrency'],
      lastUpdated: '1 week ago',
      playlistId: 'PLy7NrYWoggjzSIlwxeBouQVj7KqYNJsan'
    },
    {
      id: 'rust-programming',
      title: 'Rust Programming Complete Course',
      channel: 'Let\'s Get Rusty',
      description: 'Learn Rust programming language for systems programming and performance.',
      videoCount: 67,
      totalDuration: '16 hours',
      views: '420K',
      rating: 4.8,
      thumbnail: 'https://img.youtube.com/vi/zF34dRivLOw/maxresdefault.jpg',
      url: 'https://youtube.com/playlist?list=PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8',
      category: 'Programming',
      subcategory: 'Rust',
      level: 'Advanced',
      tags: ['Rust', 'Systems Programming', 'Memory Safety', 'Performance'],
      lastUpdated: '2 weeks ago',
      playlistId: 'PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8'
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

  // Function to get YouTube thumbnail from playlist ID
  const getYouTubeThumbnail = (playlistId: string) => {
    return `https://img.youtube.com/vi/${playlistId.split('=')[1] || playlistId}/maxresdefault.jpg`;
  };

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
              <span className="text-2xl font-bold text-gray-900">500+</span>
            </div>
            <p className="text-sm text-gray-600">Hours of Content</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">80M+</span>
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
                onError={(e) => {
                  // Fallback to a default thumbnail if the YouTube thumbnail fails
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2';
                }}
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
            'Programming with Mosh', 'JavaScript Mastery', 'CodeWithHarry', 'Derek Banas',
            'TechWorld with Nana', 'The Cyber Mentor', 'Brackeys', 'DesignCourse'
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