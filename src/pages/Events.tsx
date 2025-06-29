import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Calendar, Clock, Users, MapPin, ExternalLink, Trophy, Code, Star, Filter, Search, Loader, AlertCircle, Globe, Award, Target, Tag, Heart, Brain, Gamepad2, Shield, Smartphone, Database, Zap, DollarSign, Music, Cpu, Wifi, Lock, Building, ShoppingCart, Mic, Palette, Bot, Atom, Server } from 'lucide-react';

interface DevpostHackathon {
  id: string;
  title: string;
  url: string;
  featured_image?: {
    url: string;
  };
  thumbnail_url?: string;
  submission_period_dates: string;
  themes?: Array<{
    name: string;
  }>;
  prizes?: Array<{
    title: string;
    amount?: string;
  }>;
  displayed_location?: {
    location: string;
  };
  organization_name?: string;
  registrations_count?: number;
  submission_gallery_count?: number;
  open_state: string;
  analytics_identifier?: string;
  challenge_type?: string[];
  eligibility?: string;
  submission_type?: string;
  matchedInterests?: string[];
}

interface DevpostResponse {
  hackathons: DevpostHackathon[];
  meta: {
    total_count: number;
    per_page: number;
    total_pages: number;
  };
}

const Events: React.FC = () => {
  const [hackathons, setHackathons] = useState<DevpostHackathon[]>([]);
  const [allHackathons, setAllHackathons] = useState<DevpostHackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [totalHackathons, setTotalHackathons] = useState(0);
  const [fetchProgress, setFetchProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [targetHackathons] = useState(200); // Target 200 hackathons
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Refs for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  // Categories (renamed from Interest tags)
  const categories = [
    { name: 'Beginner Friendly', icon: Heart, color: 'bg-green-100 text-green-700' },
    { name: 'Social Good', icon: Heart, color: 'bg-pink-100 text-pink-700' },
    { name: 'Machine Learning/AI', icon: Brain, color: 'bg-purple-100 text-purple-700' },
    { name: 'Open Ended', icon: Target, color: 'bg-blue-100 text-blue-700' },
    { name: 'Education', icon: Award, color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Web', icon: Globe, color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Blockchain', icon: DollarSign, color: 'bg-orange-100 text-orange-700' },
    { name: 'Design', icon: Palette, color: 'bg-rose-100 text-rose-700' },
    { name: 'Health', icon: Heart, color: 'bg-red-100 text-red-700' },
    { name: 'Productivity', icon: Zap, color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Communication', icon: Mic, color: 'bg-cyan-100 text-cyan-700' },
    { name: 'AR/VR', icon: Target, color: 'bg-violet-100 text-violet-700' },
    { name: 'Low/No Code', icon: Code, color: 'bg-lime-100 text-lime-700' },
    { name: 'Gaming', icon: Gamepad2, color: 'bg-fuchsia-100 text-fuchsia-700' },
    { name: 'Fintech', icon: DollarSign, color: 'bg-amber-100 text-amber-700' },
    { name: 'IoT', icon: Wifi, color: 'bg-teal-100 text-teal-700' },
    { name: 'COVID-19', icon: Shield, color: 'bg-gray-100 text-gray-700' },
    { name: 'Mobile', icon: Smartphone, color: 'bg-sky-100 text-sky-700' },
    { name: 'DevOps', icon: Server, color: 'bg-slate-100 text-slate-700' },
    { name: 'Cybersecurity', icon: Lock, color: 'bg-red-100 text-red-700' },
    { name: 'Databases', icon: Database, color: 'bg-stone-100 text-stone-700' },
    { name: 'Lifehacks', icon: Zap, color: 'bg-green-100 text-green-700' },
    { name: 'Enterprise', icon: Building, color: 'bg-gray-100 text-gray-700' },
    { name: 'E-commerce/Retail', icon: ShoppingCart, color: 'bg-blue-100 text-blue-700' },
    { name: 'Voice skills', icon: Mic, color: 'bg-purple-100 text-purple-700' },
    { name: 'Music/Art', icon: Music, color: 'bg-pink-100 text-pink-700' },
    { name: 'Robotic Process Automation', icon: Bot, color: 'bg-orange-100 text-orange-700' },
    { name: 'Quantum', icon: Atom, color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Serverless', icon: Server, color: 'bg-cyan-100 text-cyan-700' },
  ];

  // Fetch hackathons from a specific page using direct API call
  const fetchHackathonsPage = async (page: number): Promise<DevpostHackathon[]> => {
    console.log(`📡 Fetching page ${page} from Devpost API...`);
    
    try {
      // Try direct API call first (may work in some environments)
      const directUrl = `https://devpost.com/api/hackathons?page=${page}&per_page=20`;
      
      let response;
      try {
        response = await fetch(directUrl, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'TechLearn-Platform/1.0'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Direct API call failed: ${response.status}`);
        }
      } catch (directError) {
        console.log('Direct API failed, trying CORS proxy...');
        
        // Fallback to CORS proxy
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(directUrl)}`;
        response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`Proxy API call failed: ${response.status}`);
        }
        
        const proxyData = await response.json();
        const data: DevpostResponse = JSON.parse(proxyData.contents);
        
        if (!data.hackathons || !Array.isArray(data.hackathons)) {
          throw new Error(`Invalid data structure on page ${page}`);
        }

        // Update total count from first page
        if (page === 1 && data.meta?.total_count) {
          setTotalHackathons(data.meta.total_count);
        }

        // Enhance hackathons with category matching
        const enhancedHackathons = data.hackathons.map((hackathon: DevpostHackathon) => ({
          ...hackathon,
          matchedInterests: getMatchedCategories(hackathon)
        }));
        
        console.log(`✅ Page ${page}: Fetched ${enhancedHackathons.length} hackathons via proxy`);
        return enhancedHackathons;
      }
      
      // Handle direct response
      const data: DevpostResponse = await response.json();
      
      if (!data.hackathons || !Array.isArray(data.hackathons)) {
        throw new Error(`Invalid data structure on page ${page}`);
      }

      // Update total count from first page
      if (page === 1 && data.meta?.total_count) {
        setTotalHackathons(data.meta.total_count);
      }

      // Enhance hackathons with category matching
      const enhancedHackathons = data.hackathons.map((hackathon: DevpostHackathon) => ({
        ...hackathon,
        matchedInterests: getMatchedCategories(hackathon)
      }));
      
      console.log(`✅ Page ${page}: Fetched ${enhancedHackathons.length} hackathons directly`);
      return enhancedHackathons;
      
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error);
      throw error;
    }
  };

  // Initial fetch of hackathons with aggressive loading
  const fetchInitialHackathons = async () => {
    setLoading(true);
    setError(null);
    setFetchProgress(0);
    setIsInitialLoad(true);

    try {
      console.log(`🚀 Starting aggressive fetch to load ${targetHackathons} hackathons...`);
      
      const allData: DevpostHackathon[] = [];
      let currentPageNum = 1;
      let hasMore = true;
      
      // Calculate how many pages we need (200 hackathons ÷ 20 per page = 10 pages)
      const targetPages = Math.ceil(targetHackathons / 20);
      
      while (hasMore && allData.length < targetHackathons && currentPageNum <= targetPages) {
        try {
          console.log(`📄 Fetching page ${currentPageNum}... (${allData.length}/${targetHackathons} loaded)`);
          
          const pageData = await fetchHackathonsPage(currentPageNum);
          
          if (pageData.length === 0) {
            console.log('📄 No more data available');
            hasMore = false;
            break;
          }
          
          // Add new hackathons, avoiding duplicates
          const newHackathons = pageData.filter(newHack => 
            !allData.some(existingHack => existingHack.id === newHack.id)
          );
          
          allData.push(...newHackathons);
          
          // Update progress
          const progress = Math.min((allData.length / targetHackathons) * 100, 100);
          setFetchProgress(progress);
          
          // Update state with current data
          setAllHackathons([...allData]);
          setHackathons([...allData]);
          
          console.log(`✅ Page ${currentPageNum} complete. Total: ${allData.length} hackathons`);
          
          // Check if we've reached our target
          if (allData.length >= targetHackathons) {
            console.log(`🎯 Target reached! Loaded ${allData.length} hackathons`);
            setHasMoreData(false);
            break;
          }
          
          currentPageNum++;
          
          // Small delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (pageError) {
          console.error(`❌ Error fetching page ${currentPageNum}:`, pageError);
          
          if (currentPageNum === 1) {
            // If first page fails, throw error
            throw pageError;
          } else {
            // For subsequent pages, continue with what we have
            console.log(`⚠️ Page ${currentPageNum} failed, continuing with ${allData.length} hackathons`);
            hasMore = false;
            break;
          }
        }
      }

      if (allData.length === 0) {
        throw new Error('No hackathons fetched from any page');
      }

      console.log(`🎉 Successfully fetched ${allData.length} hackathons from Devpost!`);
      setCurrentPage(currentPageNum);
      
      // Set hasMoreData based on whether we reached our target
      setHasMoreData(allData.length < targetHackathons && hasMore);
      
    } catch (err) {
      console.error('❌ Error fetching hackathons:', err);
      setError('Unable to fetch live data from Devpost. Showing enhanced sample hackathons instead.');
      
      // Fallback to enhanced sample data (200 hackathons)
      const sampleData = getEnhancedSampleHackathons();
      setAllHackathons(sampleData);
      setHackathons(sampleData);
      setHasMoreData(false);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
      setFetchProgress(100);
    }
  };

  // Load more hackathons (infinite scroll) - more aggressive
  const loadMoreHackathons = useCallback(async () => {
    if (loadingMore || !hasMoreData || allHackathons.length >= targetHackathons || isInitialLoad) {
      return;
    }

    setLoadingMore(true);
    console.log(`🔄 Loading more hackathons from page ${currentPage}... (Current: ${allHackathons.length}/${targetHackathons})`);

    try {
      const newHackathons = await fetchHackathonsPage(currentPage);
      
      if (newHackathons.length > 0) {
        setAllHackathons(prev => {
          // Remove duplicates based on ID
          const combined = [...prev, ...newHackathons];
          const unique = combined.filter((hackathon, index, self) => 
            index === self.findIndex(h => h.id === hackathon.id)
          );
          
          // Check if we've reached our target
          if (unique.length >= targetHackathons) {
            setHasMoreData(false);
            console.log(`🎯 Target reached! Loaded ${unique.length} hackathons`);
            return unique.slice(0, targetHackathons); // Limit to exactly target
          }
          
          return unique;
        });
        
        setCurrentPage(prev => prev + 1);
        console.log(`✅ Loaded ${newHackathons.length} more hackathons`);
      } else {
        setHasMoreData(false);
        console.log('📄 No more hackathons to load');
      }
    } catch (error) {
      console.error('❌ Error loading more hackathons:', error);
      setHasMoreData(false);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, loadingMore, hasMoreData, allHackathons.length, targetHackathons, isInitialLoad]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loadingMore && hasMoreData && allHackathons.length < targetHackathons && !isInitialLoad) {
          console.log('🔍 Intersection detected, loading more hackathons...');
          loadMoreHackathons();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Load when user is 100px away from trigger
      }
    );

    if (loadingTriggerRef.current) {
      observerRef.current.observe(loadingTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreHackathons, loadingMore, hasMoreData, allHackathons.length, targetHackathons, isInitialLoad]);

  // Match hackathon themes with categories
  const getMatchedCategories = (hackathon: DevpostHackathon): string[] => {
    const matched: string[] = [];
    const title = hackathon.title.toLowerCase();
    const themes = hackathon.themes?.map(t => t.name.toLowerCase()) || [];
    const allText = [title, ...themes].join(' ');

    // AI/ML keywords
    if (allText.includes('ai') || allText.includes('machine learning') || allText.includes('artificial intelligence') || allText.includes('ml') || allText.includes('neural') || allText.includes('deep learning') || allText.includes('chatgpt') || allText.includes('openai')) {
      matched.push('Machine Learning/AI');
    }

    // Web development
    if (allText.includes('web') || allText.includes('frontend') || allText.includes('backend') || allText.includes('react') || allText.includes('javascript') || allText.includes('html') || allText.includes('css')) {
      matched.push('Web');
    }

    // Mobile
    if (allText.includes('mobile') || allText.includes('ios') || allText.includes('android') || allText.includes('app') || allText.includes('flutter') || allText.includes('react native')) {
      matched.push('Mobile');
    }

    // Blockchain
    if (allText.includes('blockchain') || allText.includes('crypto') || allText.includes('defi') || allText.includes('web3') || allText.includes('ethereum') || allText.includes('bitcoin') || allText.includes('nft')) {
      matched.push('Blockchain');
    }

    // Gaming
    if (allText.includes('game') || allText.includes('gaming') || allText.includes('unity') || allText.includes('unreal') || allText.includes('esports')) {
      matched.push('Gaming');
    }

    // AR/VR
    if (allText.includes('vr') || allText.includes('ar') || allText.includes('virtual reality') || allText.includes('augmented reality') || allText.includes('metaverse') || allText.includes('oculus')) {
      matched.push('AR/VR');
      if (!matched.includes('Gaming')) {
        matched.push('Gaming');
      }
    }

    // Health
    if (allText.includes('health') || allText.includes('medical') || allText.includes('healthcare') || allText.includes('wellness') || allText.includes('fitness') || allText.includes('mental health')) {
      matched.push('Health');
    }

    // COVID-19
    if (allText.includes('covid') || allText.includes('pandemic') || allText.includes('coronavirus')) {
      matched.push('COVID-19');
      if (!matched.includes('Health')) {
        matched.push('Health');
      }
    }

    // Social Good
    if (allText.includes('social') || allText.includes('good') || allText.includes('impact') || allText.includes('sustainability') || allText.includes('environment') || allText.includes('climate') || allText.includes('charity') || allText.includes('nonprofit')) {
      matched.push('Social Good');
    }

    // Fintech
    if (allText.includes('fintech') || allText.includes('finance') || allText.includes('banking') || allText.includes('payment') || allText.includes('trading') || allText.includes('investment')) {
      matched.push('Fintech');
    }

    // Cybersecurity
    if (allText.includes('security') || allText.includes('cyber') || allText.includes('privacy') || allText.includes('encryption') || allText.includes('hacking') || allText.includes('penetration')) {
      matched.push('Cybersecurity');
    }

    // Education
    if (allText.includes('education') || allText.includes('learning') || allText.includes('student') || allText.includes('academic') || allText.includes('school') || allText.includes('university') || allText.includes('edtech')) {
      matched.push('Education');
    }

    // IoT
    if (allText.includes('iot') || allText.includes('internet of things') || allText.includes('sensor') || allText.includes('embedded') || allText.includes('smart home') || allText.includes('connected')) {
      matched.push('IoT');
    }

    // Design
    if (allText.includes('design') || allText.includes('ui') || allText.includes('ux') || allText.includes('creative') || allText.includes('graphic') || allText.includes('visual')) {
      matched.push('Design');
    }

    // Music/Art
    if (allText.includes('art') || allText.includes('music') || allText.includes('creative') || allText.includes('audio') || allText.includes('visual') || allText.includes('media')) {
      matched.push('Music/Art');
      if (!matched.includes('Design')) {
        matched.push('Design');
      }
    }

    // Beginner Friendly
    if (allText.includes('beginner') || allText.includes('first time') || allText.includes('newcomer') || allText.includes('intro') || allText.includes('starter') || allText.includes('newbie')) {
      matched.push('Beginner Friendly');
    }

    // Open Ended
    if (allText.includes('open') || allText.includes('any') || allText.includes('creative') || allText.includes('innovation') || allText.includes('freestyle') || allText.includes('general')) {
      matched.push('Open Ended');
    }

    // Productivity
    if (allText.includes('productivity') || allText.includes('workflow') || allText.includes('automation') || allText.includes('efficiency') || allText.includes('tool')) {
      matched.push('Productivity');
    }

    // Communication
    if (allText.includes('communication') || allText.includes('chat') || allText.includes('messaging') || allText.includes('social') || allText.includes('collaboration')) {
      matched.push('Communication');
    }

    // Low/No Code
    if (allText.includes('no code') || allText.includes('low code') || allText.includes('nocode') || allText.includes('lowcode') || allText.includes('visual programming')) {
      matched.push('Low/No Code');
    }

    // DevOps
    if (allText.includes('devops') || allText.includes('deployment') || allText.includes('ci/cd') || allText.includes('docker') || allText.includes('kubernetes')) {
      matched.push('DevOps');
    }

    // Databases
    if (allText.includes('database') || allText.includes('sql') || allText.includes('nosql') || allText.includes('data') || allText.includes('analytics')) {
      matched.push('Databases');
    }

    // Enterprise
    if (allText.includes('enterprise') || allText.includes('business') || allText.includes('corporate') || allText.includes('b2b') || allText.includes('saas')) {
      matched.push('Enterprise');
    }

    // E-commerce/Retail
    if (allText.includes('ecommerce') || allText.includes('e-commerce') || allText.includes('retail') || allText.includes('shopping') || allText.includes('marketplace')) {
      matched.push('E-commerce/Retail');
    }

    // Voice skills
    if (allText.includes('voice') || allText.includes('alexa') || allText.includes('google assistant') || allText.includes('speech') || allText.includes('audio')) {
      matched.push('Voice skills');
    }

    // Quantum
    if (allText.includes('quantum') || allText.includes('qubits') || allText.includes('quantum computing')) {
      matched.push('Quantum');
    }

    // Serverless
    if (allText.includes('serverless') || allText.includes('lambda') || allText.includes('cloud functions') || allText.includes('faas')) {
      matched.push('Serverless');
    }

    return matched;
  };

  // Enhanced sample hackathons with categories (200 hackathons)
  const getEnhancedSampleHackathons = (): DevpostHackathon[] => {
    const sampleHackathons = [];
    
    // Generate 200 sample hackathons with variety
    for (let i = 1; i <= 200; i++) {
      const hackathonTypes = [
        {
          title: `AI Innovation Challenge ${i}`,
          category: 'AI & ML',
          themes: [{ name: 'Artificial Intelligence' }, { name: 'Machine Learning' }, { name: 'Deep Learning' }],
          matchedInterests: ['Machine Learning/AI', 'Open Ended', 'Enterprise']
        },
        {
          title: `Web3 DeFi Hackathon ${i}`,
          category: 'Blockchain',
          themes: [{ name: 'Blockchain' }, { name: 'DeFi' }, { name: 'Smart Contracts' }],
          matchedInterests: ['Blockchain', 'Fintech', 'Web']
        },
        {
          title: `Climate Tech Solutions ${i}`,
          category: 'Social Good',
          themes: [{ name: 'Climate Change' }, { name: 'Sustainability' }, { name: 'Green Tech' }],
          matchedInterests: ['Social Good', 'IoT', 'Open Ended']
        },
        {
          title: `Mobile Health App Challenge ${i}`,
          category: 'Health',
          themes: [{ name: 'Mobile Development' }, { name: 'Healthcare' }, { name: 'Wellness' }],
          matchedInterests: ['Mobile', 'Health', 'Beginner Friendly']
        },
        {
          title: `Cybersecurity Defense Hackathon ${i}`,
          category: 'Security',
          themes: [{ name: 'Cybersecurity' }, { name: 'Privacy' }, { name: 'Encryption' }],
          matchedInterests: ['Cybersecurity', 'Enterprise', 'Web']
        },
        {
          title: `Gaming & VR Experience Jam ${i}`,
          category: 'Gaming',
          themes: [{ name: 'Game Development' }, { name: 'Virtual Reality' }, { name: 'Interactive Design' }],
          matchedInterests: ['Gaming', 'AR/VR', 'Design', 'Beginner Friendly']
        },
        {
          title: `EdTech Innovation Challenge ${i}`,
          category: 'Education',
          themes: [{ name: 'Education Technology' }, { name: 'Learning' }, { name: 'Students' }],
          matchedInterests: ['Education', 'Web', 'Mobile', 'Social Good']
        },
        {
          title: `Fintech Revolution ${i}`,
          category: 'Finance',
          themes: [{ name: 'Financial Technology' }, { name: 'Banking' }, { name: 'Payments' }],
          matchedInterests: ['Fintech', 'Mobile', 'Enterprise']
        },
        {
          title: `IoT Smart City Challenge ${i}`,
          category: 'IoT',
          themes: [{ name: 'Internet of Things' }, { name: 'Smart Cities' }, { name: 'Sensors' }],
          matchedInterests: ['IoT', 'Social Good', 'Enterprise']
        },
        {
          title: `Creative Arts & Music Hack ${i}`,
          category: 'Arts',
          themes: [{ name: 'Digital Art' }, { name: 'Music Technology' }, { name: 'Creative Tools' }],
          matchedInterests: ['Music/Art', 'Design', 'Web']
        }
      ];

      const type = hackathonTypes[i % hackathonTypes.length];
      const statuses = ['open', 'upcoming', 'closed'];
      const locations = ['Online', 'San Francisco, CA', 'New York, NY', 'London, UK', 'Berlin, Germany', 'Tokyo, Japan'];
      
      sampleHackathons.push({
        id: i.toString(),
        title: type.title,
        url: `https://devpost.com/hackathons/sample-${i}`,
        featured_image: {
          url: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2`
        },
        submission_period_dates: `${new Date(Date.now() + i * 86400000).toLocaleDateString()} - ${new Date(Date.now() + (i + 7) * 86400000).toLocaleDateString()}`,
        themes: type.themes,
        prizes: [
          { title: 'Grand Prize', amount: `$${(Math.random() * 10000 + 5000).toFixed(0)}` },
          { title: 'Runner Up', amount: `$${(Math.random() * 5000 + 2000).toFixed(0)}` }
        ],
        displayed_location: {
          location: locations[i % locations.length]
        },
        organization_name: `Tech Company ${i}`,
        registrations_count: Math.floor(Math.random() * 3000) + 500,
        submission_gallery_count: Math.floor(Math.random() * 200) + 20,
        open_state: statuses[i % statuses.length],
        matchedInterests: type.matchedInterests
      });
    }
    
    return sampleHackathons;
  };

  useEffect(() => {
    fetchInitialHackathons();
  }, []);

  const handleSearch = () => {
    filterHackathons();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filterHackathons = () => {
    let filtered = [...allHackathons];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(hackathon =>
        hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.organization_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.themes?.some(theme => 
          theme.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(hackathon => hackathon.open_state === statusFilter);
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(hackathon => {
        const hackathonCategories = hackathon.matchedInterests || [];
        return selectedCategories.some(category => hackathonCategories.includes(category));
      });
    }

    setHackathons(filtered);
  };

  useEffect(() => {
    filterHackathons();
  }, [searchTerm, statusFilter, selectedCategories, allHackathons]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open for Registration';
      case 'upcoming':
        return 'Coming Soon';
      case 'closed':
        return 'Registration Closed';
      default:
        return 'Unknown';
    }
  };

  const formatPrizeAmount = (amount?: string) => {
    if (!amount) return '';
    return amount.replace(/\$(\d+)/, '$$$1');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Global Hackathons</h1>
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Target: {targetHackathons} Hackathons
          </div>
        </div>
        <p className="text-gray-600">
          Discover and participate in hackathons from around the world. 
          {totalHackathons > 0 && ` Showing ${hackathons.length} of ${allHackathons.length} hackathons loaded from Devpost.`}
          {hasMoreData && allHackathons.length < targetHackathons && ' More loading automatically as you scroll!'}
          {allHackathons.length >= targetHackathons && ` 🎯 Target of ${targetHackathons} hackathons reached!`}
        </p>
      </div>

      {/* Loading Progress */}
      {loading && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center space-x-4">
            <Loader className="h-6 w-6 text-primary-600 animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Aggressively fetching hackathons from Devpost... ({Math.round(fetchProgress)}%)
              </p>
              <div className="bg-gray-200 h-3 rounded-full">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${fetchProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Loading up to {targetHackathons} hackathons from multiple pages simultaneously...
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                <span>📊 Current: {allHackathons.length}</span>
                <span>🎯 Target: {targetHackathons}</span>
                <span>📄 Progress: {Math.round((allHackathons.length / targetHackathons) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="upcoming">Upcoming</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Search
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Tag className="h-4 w-4" />
            <span>Categories</span>
            {selectedCategories.length > 0 && (
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                {selectedCategories.length}
              </span>
            )}
          </button>
        </div>

        {/* Categories Filter */}
        {showFilters && (
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>Filter by Categories</span>
              {selectedCategories.length > 0 && (
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                  {selectedCategories.length} selected
                </span>
              )}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategories.includes(category.name);
                
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryToggle(category.name)}
                    className={`flex items-center space-x-2 p-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                        : `${category.color} hover:scale-105 border-2 border-transparent`
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {selectedCategories.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{category}</span>
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="text-primary-500 hover:text-primary-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-800 font-medium">API Notice</p>
              <p className="text-yellow-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{hackathons.length}</span> hackathon{hackathons.length !== 1 ? 's' : ''}
          {allHackathons.length > 0 && ` out of ${allHackathons.length} loaded`}
          {selectedCategories.length > 0 && ` matching your categories`}
          {statusFilter !== 'all' && ` with status: ${statusFilter}`}
        </p>
        
        {allHackathons.length > 0 && (
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <span>📡 Live from Devpost</span>
            {hasMoreData && allHackathons.length < targetHackathons && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs animate-pulse">
                🔄 Auto-loading to {targetHackathons}
              </span>
            )}
            {allHackathons.length >= targetHackathons && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                🎯 Target achieved!
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hackathons Grid */}
      {!loading && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {hackathons.map((hackathon) => (
              <div key={hackathon.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative">
                  <img
                    src={hackathon.featured_image?.url || hackathon.thumbnail_url || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'}
                    alt={hackathon.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(hackathon.open_state)}`}>
                      {getStatusText(hackathon.open_state)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View on Devpost</span>
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    {hackathon.organization_name && (
                      <>
                        <span className="text-sm text-primary-600 font-medium">{hackathon.organization_name}</span>
                        <span className="text-gray-300">•</span>
                      </>
                    )}
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {hackathon.displayed_location?.location || 'Online'}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{hackathon.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{hackathon.submission_period_dates}</span>
                    </div>
                    
                    {hackathon.registrations_count && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{hackathon.registrations_count.toLocaleString()} registered</span>
                      </div>
                    )}

                    {hackathon.submission_gallery_count && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Code className="h-4 w-4" />
                        <span>{hackathon.submission_gallery_count} submissions</span>
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  {hackathon.matchedInterests && hackathon.matchedInterests.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hackathon.matchedInterests.slice(0, 3).map((interest: string, index: number) => {
                        const category = categories.find(c => c.name === interest);
                        return (
                          <span key={index} className={`text-xs px-2 py-1 rounded ${category?.color || 'bg-gray-100 text-gray-600'}`}>
                            {interest}
                          </span>
                        );
                      })}
                      {hackathon.matchedInterests.length > 3 && (
                        <span className="text-xs text-gray-500">+{hackathon.matchedInterests.length - 3} more</span>
                      )}
                    </div>
                  )}

                  {/* Themes */}
                  {hackathon.themes && hackathon.themes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hackathon.themes.slice(0, 3).map((theme, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {theme.name}
                        </span>
                      ))}
                      {hackathon.themes.length > 3 && (
                        <span className="text-xs text-gray-500">+{hackathon.themes.length - 3} more</span>
                      )}
                    </div>
                  )}

                  {/* Prizes */}
                  {hackathon.prizes && hackathon.prizes.length > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Prizes</span>
                      </div>
                      <div className="space-y-1">
                        {hackathon.prizes.slice(0, 2).map((prize, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{prize.title}</span>
                            {prize.amount && (
                              <span className="font-medium text-green-600">{formatPrizeAmount(prize.amount)}</span>
                            )}
                          </div>
                        ))}
                        {hackathon.prizes.length > 2 && (
                          <p className="text-xs text-gray-500">+{hackathon.prizes.length - 2} more prizes</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <a
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm font-medium"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    
                    {hackathon.open_state === 'open' && (
                      <a
                        href={hackathon.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        Register Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Loading Trigger */}
          {hasMoreData && !loadingMore && allHackathons.length < targetHackathons && !isInitialLoad && (
            <div 
              ref={loadingTriggerRef}
              className="h-20 flex items-center justify-center"
            >
              <div className="text-gray-500 text-sm bg-white rounded-lg p-4 shadow-sm border">
                🔄 Loading more hackathons... ({allHackathons.length}/{targetHackathons})
              </div>
            </div>
          )}

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="flex items-center justify-center py-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center space-x-4">
                <Loader className="h-6 w-6 text-primary-600 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Loading more hackathons...</p>
                  <p className="text-xs text-gray-500">
                    Fetching page {currentPage} from Devpost ({allHackathons.length}/{targetHackathons} loaded)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Target Reached Indicator */}
          {allHackathons.length >= targetHackathons && (
            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">🎯 Target Achieved!</h3>
                <p className="text-gray-600">
                  Successfully loaded <span className="font-bold text-green-600">{allHackathons.length}</span> hackathons from Devpost!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Use the filters above to explore different categories and find the perfect hackathon for you.
                </p>
              </div>
            </div>
          )}

          {/* End of Data Indicator */}
          {!hasMoreData && allHackathons.length > 0 && allHackathons.length < targetHackathons && (
            <div className="text-center py-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <Trophy className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">You've reached the end!</h3>
                <p className="text-gray-600">
                  You've seen all {allHackathons.length} hackathons we've loaded from Devpost.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Check back later for new hackathons or adjust your filters to see different results.
                </p>
              </div>
            </div>
          )}

          {/* No Results */}
          {hackathons.length === 0 && !loading && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hackathons found</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategories.length > 0 
                  ? 'Try adjusting your category filters or search criteria'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear Category Filters
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Statistics */}
      {allHackathons.length > 0 && (
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white mb-8">
          <h3 className="text-lg font-semibold mb-4">📊 Hackathon Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{allHackathons.length}</div>
              <div className="text-sm text-primary-100">Total Loaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{targetHackathons}</div>
              <div className="text-sm text-primary-100">Target Goal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{allHackathons.filter(h => h.open_state === 'open').length}</div>
              <div className="text-sm text-primary-100">Currently Open</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{allHackathons.filter(h => h.open_state === 'upcoming').length}</div>
              <div className="text-sm text-primary-100">Coming Soon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round(allHackathons.reduce((sum, h) => sum + (h.registrations_count || 0), 0) / 1000)}K
              </div>
              <div className="text-sm text-primary-100">Total Participants</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="bg-white/20 rounded-full h-3 mb-2">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((allHackathons.length / targetHackathons) * 100, 100)}%` }}
              />
            </div>
            <p className="text-primary-100 text-sm">
              Progress: {allHackathons.length}/{targetHackathons} hackathons loaded 
              ({Math.round((allHackathons.length / targetHackathons) * 100)}%)
            </p>
          </div>
        </div>
      )}

      {/* Devpost Attribution */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">
            Hackathon data powered by{' '}
            <a 
              href="https://devpost.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Devpost
            </a>
          </p>
          <p className="text-xs text-gray-500">
            Discover more hackathons and showcase your projects on Devpost
          </p>
        </div>
      </div>
    </div>
  );
};

export default Events;