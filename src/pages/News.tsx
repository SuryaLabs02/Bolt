import React, { useState, useEffect } from 'react';
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
  Search,
  Globe,
  Loader2,
  AlertCircle,
  RefreshCw,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage?: string;
  category: string;
  author?: string;
  content?: string;
  domain: string;
}

interface NewsSource {
  name: string;
  url: string;
  category: string;
  description: string;
  favicon: string;
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const categories = [
    'All', 'Technology', 'AI & ML', 'Web Development', 'Cybersecurity', 'Blockchain', 
    'Cloud Computing', 'Mobile Development', 'Data Science', 'DevOps', 'Programming',
    'Startups', 'Business', 'Science', 'Innovation'
  ];

  // Comprehensive news sources for tech content
  const newsSources: NewsSource[] = [
    { name: 'TechCrunch', url: 'https://techcrunch.com', category: 'Technology', description: 'Startup and technology news', favicon: '🚀' },
    { name: 'Hacker News', url: 'https://news.ycombinator.com', category: 'Technology', description: 'Tech community news', favicon: '🔶' },
    { name: 'The Verge', url: 'https://theverge.com', category: 'Technology', description: 'Technology, science, art, and culture', favicon: '📱' },
    { name: 'Ars Technica', url: 'https://arstechnica.com', category: 'Technology', description: 'Technology news and analysis', favicon: '🔬' },
    { name: 'Wired', url: 'https://wired.com', category: 'Technology', description: 'Technology, business, culture', favicon: '⚡' },
    { name: 'MIT Technology Review', url: 'https://technologyreview.com', category: 'AI & ML', description: 'Emerging technology insights', favicon: '🧠' },
    { name: 'VentureBeat', url: 'https://venturebeat.com', category: 'Technology', description: 'Technology news and events', favicon: '💼' },
    { name: 'ZDNet', url: 'https://zdnet.com', category: 'Technology', description: 'Technology news for IT professionals', favicon: '💻' },
    { name: 'Engadget', url: 'https://engadget.com', category: 'Technology', description: 'Consumer technology news', favicon: '📺' },
    { name: 'TechRadar', url: 'https://techradar.com', category: 'Technology', description: 'Technology buying advice and news', favicon: '📡' },
    { name: 'GitHub Blog', url: 'https://github.blog', category: 'Programming', description: 'Developer tools and open source', favicon: '🐱' },
    { name: 'Stack Overflow Blog', url: 'https://stackoverflow.blog', category: 'Programming', description: 'Developer community insights', favicon: '📚' },
    { name: 'Dev.to', url: 'https://dev.to', category: 'Programming', description: 'Developer community articles', favicon: '👩‍💻' },
    { name: 'CSS-Tricks', url: 'https://css-tricks.com', category: 'Web Development', description: 'Web development tutorials', favicon: '🎨' },
    { name: 'Smashing Magazine', url: 'https://smashingmagazine.com', category: 'Web Development', description: 'Web design and development', favicon: '🔨' },
    { name: 'A List Apart', url: 'https://alistapart.com', category: 'Web Development', description: 'Web standards and best practices', favicon: '📝' },
    { name: 'KrebsOnSecurity', url: 'https://krebsonsecurity.com', category: 'Cybersecurity', description: 'Cybersecurity news and investigation', favicon: '🔒' },
    { name: 'The Hacker News', url: 'https://thehackernews.com', category: 'Cybersecurity', description: 'Cybersecurity news and analysis', favicon: '🛡️' },
    { name: 'CoinDesk', url: 'https://coindesk.com', category: 'Blockchain', description: 'Cryptocurrency and blockchain news', favicon: '₿' },
    { name: 'Cointelegraph', url: 'https://cointelegraph.com', category: 'Blockchain', description: 'Blockchain technology news', favicon: '⛓️' },
    { name: 'AWS News', url: 'https://aws.amazon.com/blogs/aws/', category: 'Cloud Computing', description: 'Amazon Web Services updates', favicon: '☁️' },
    { name: 'Google Cloud Blog', url: 'https://cloud.google.com/blog', category: 'Cloud Computing', description: 'Google Cloud Platform news', favicon: '🌩️' },
    { name: 'Microsoft Azure Blog', url: 'https://azure.microsoft.com/blog/', category: 'Cloud Computing', description: 'Microsoft Azure updates', favicon: '🔷' },
    { name: 'Android Developers Blog', url: 'https://android-developers.googleblog.com', category: 'Mobile Development', description: 'Android development news', favicon: '🤖' },
    { name: 'iOS Dev Weekly', url: 'https://iosdevweekly.com', category: 'Mobile Development', description: 'iOS development news', favicon: '🍎' },
    { name: 'Towards Data Science', url: 'https://towardsdatascience.com', category: 'Data Science', description: 'Data science and machine learning', favicon: '📊' },
    { name: 'KDnuggets', url: 'https://kdnuggets.com', category: 'Data Science', description: 'Data science and analytics', favicon: '💎' },
    { name: 'Docker Blog', url: 'https://docker.com/blog', category: 'DevOps', description: 'Containerization and DevOps', favicon: '🐳' },
    { name: 'Kubernetes Blog', url: 'https://kubernetes.io/blog', category: 'DevOps', description: 'Container orchestration news', favicon: '⚙️' },
    { name: 'Product Hunt', url: 'https://producthunt.com', category: 'Startups', description: 'New product discoveries', favicon: '🦄' },
    { name: 'Y Combinator', url: 'https://ycombinator.com/blog', category: 'Startups', description: 'Startup accelerator insights', favicon: '🚀' },
    { name: 'Fast Company', url: 'https://fastcompany.com', category: 'Business', description: 'Business innovation and technology', favicon: '⚡' },
    { name: 'Harvard Business Review', url: 'https://hbr.org', category: 'Business', description: 'Business strategy and management', favicon: '📈' },
    { name: 'Nature', url: 'https://nature.com', category: 'Science', description: 'Scientific research and discoveries', favicon: '🔬' },
    { name: 'Science Magazine', url: 'https://science.org', category: 'Science', description: 'Scientific breakthroughs', favicon: '🧪' }
  ];

  // Category-specific thumbnail mappings
  const getCategoryThumbnail = (category: string, title: string) => {
    const categoryThumbnails: { [key: string]: string[] } = {
      'Technology': [
        'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'AI & ML': [
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8439094/pexels-photo-8439094.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Web Development': [
        'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/11035539/pexels-photo-11035539.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Cybersecurity': [
        'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/5483078/pexels-photo-5483078.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Blockchain': [
        'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/315788/pexels-photo-315788.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1447418/pexels-photo-1447418.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1447419/pexels-photo-1447419.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Cloud Computing': [
        'https://images.pexels.com/photos/667295/pexels-photo-667295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181356/pexels-photo-1181356.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Mobile Development': [
        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Data Science': [
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'DevOps': [
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Programming': [
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Startups': [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Business': [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Science': [
        'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ],
      'Innovation': [
        'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'
      ]
    };

    const categoryImages = categoryThumbnails[category] || categoryThumbnails['Technology'];
    // Use title hash to consistently select the same image for the same article
    const titleHash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const imageIndex = Math.abs(titleHash) % categoryImages.length;
    return categoryImages[imageIndex];
  };

  // Generate comprehensive tech news articles with randomization for refresh
  const generateTechNews = (): NewsArticle[] => {
    const techTopicsPool = [
      // AI & ML News Pool
      { title: 'OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities', category: 'AI & ML', source: 'TechCrunch' },
      { title: 'Google\'s Gemini AI Surpasses GPT-4 in Latest Benchmarks', category: 'AI & ML', source: 'MIT Technology Review' },
      { title: 'Meta Releases Open Source AI Model Rivaling ChatGPT', category: 'AI & ML', source: 'The Verge' },
      { title: 'Microsoft Copilot Integration Transforms Developer Productivity', category: 'AI & ML', source: 'VentureBeat' },
      { title: 'Anthropic\'s Claude 3 Shows Breakthrough in AI Safety', category: 'AI & ML', source: 'Wired' },
      { title: 'NVIDIA\'s New AI Chips Break Performance Records', category: 'AI & ML', source: 'Ars Technica' },
      { title: 'DeepMind Solves Complex Protein Folding Problems', category: 'AI & ML', source: 'Nature' },
      { title: 'AI-Powered Code Generation Reaches 90% Accuracy', category: 'AI & ML', source: 'GitHub Blog' },
      { title: 'Large Language Models Transform Scientific Research', category: 'AI & ML', source: 'MIT Technology Review' },
      { title: 'Computer Vision Breakthrough in Medical Diagnosis', category: 'AI & ML', source: 'Nature' },
      
      // Web Development News Pool
      { title: 'React 19 Beta Released with Game-Changing Server Components', category: 'Web Development', source: 'The Verge' },
      { title: 'Next.js 15 Introduces Revolutionary Performance Optimizations', category: 'Web Development', source: 'CSS-Tricks' },
      { title: 'Vue.js 4.0 Alpha Brings Composition API Enhancements', category: 'Web Development', source: 'Smashing Magazine' },
      { title: 'Angular 18 Features Advanced Standalone Components', category: 'Web Development', source: 'A List Apart' },
      { title: 'Svelte 5 Runes System Revolutionizes State Management', category: 'Web Development', source: 'Dev.to' },
      { title: 'WebAssembly Gains Native DOM Access Capabilities', category: 'Web Development', source: 'Mozilla Blog' },
      { title: 'Progressive Web Apps Reach Native Performance Parity', category: 'Web Development', source: 'Google Developers' },
      { title: 'CSS Container Queries Transform Responsive Design', category: 'Web Development', source: 'CSS-Tricks' },
      { title: 'TypeScript 5.5 Introduces Advanced Type Features', category: 'Web Development', source: 'Microsoft Blog' },
      { title: 'Vite 5.0 Revolutionizes Frontend Build Tools', category: 'Web Development', source: 'Dev.to' },
      
      // Cybersecurity News Pool
      { title: 'Major Security Vulnerability Discovered in Popular Docker Images', category: 'Cybersecurity', source: 'KrebsOnSecurity' },
      { title: 'Zero-Day Exploit Affects Millions of WordPress Sites', category: 'Cybersecurity', source: 'The Hacker News' },
      { title: 'New Ransomware Strain Targets Cloud Infrastructure', category: 'Cybersecurity', source: 'ZDNet' },
      { title: 'Quantum-Resistant Encryption Standards Finalized', category: 'Cybersecurity', source: 'Ars Technica' },
      { title: 'AI-Powered Threat Detection Reduces Response Time by 80%', category: 'Cybersecurity', source: 'VentureBeat' },
      { title: 'Supply Chain Attacks Increase 300% in Enterprise Software', category: 'Cybersecurity', source: 'The Hacker News' },
      { title: 'Critical Vulnerability Found in Popular JavaScript Libraries', category: 'Cybersecurity', source: 'GitHub Blog' },
      { title: 'Biometric Authentication Systems Face New Threats', category: 'Cybersecurity', source: 'KrebsOnSecurity' },
      
      // Blockchain News Pool
      { title: 'Ethereum 2.0 Staking Rewards Reach All-Time High', category: 'Blockchain', source: 'CoinDesk' },
      { title: 'Bitcoin Lightning Network Processes Record Transactions', category: 'Blockchain', source: 'Cointelegraph' },
      { title: 'Central Bank Digital Currencies Gain Global Adoption', category: 'Blockchain', source: 'CoinDesk' },
      { title: 'DeFi Protocols Introduce Revolutionary Yield Farming', category: 'Blockchain', source: 'Cointelegraph' },
      { title: 'NFT Marketplace Integrates AI-Generated Content', category: 'Blockchain', source: 'The Verge' },
      { title: 'Web3 Gaming Platforms Reach 10 Million Users', category: 'Blockchain', source: 'TechCrunch' },
      { title: 'Layer 2 Solutions Reduce Ethereum Gas Fees by 95%', category: 'Blockchain', source: 'CoinDesk' },
      { title: 'Cross-Chain Bridges Enable Seamless Asset Transfer', category: 'Blockchain', source: 'Cointelegraph' },
      
      // Cloud Computing News Pool
      { title: 'AWS Launches New AI-Powered Development Tools', category: 'Cloud Computing', source: 'AWS News' },
      { title: 'Google Cloud Introduces Quantum Computing Services', category: 'Cloud Computing', source: 'Google Cloud Blog' },
      { title: 'Microsoft Azure Achieves Carbon Negative Operations', category: 'Cloud Computing', source: 'Microsoft Azure Blog' },
      { title: 'Serverless Computing Adoption Grows 400% Year-over-Year', category: 'Cloud Computing', source: 'TechCrunch' },
      { title: 'Multi-Cloud Strategies Become Enterprise Standard', category: 'Cloud Computing', source: 'ZDNet' },
      { title: 'Edge Computing Infrastructure Expands Globally', category: 'Cloud Computing', source: 'Engadget' },
      { title: 'Kubernetes Adoption Reaches 90% in Large Enterprises', category: 'Cloud Computing', source: 'TechRadar' },
      { title: 'Cloud Security Spending Increases 250% Annually', category: 'Cloud Computing', source: 'VentureBeat' },
      
      // Mobile Development News Pool
      { title: 'Flutter 4.0 Brings Native Performance to Web Applications', category: 'Mobile Development', source: 'Google Developers' },
      { title: 'React Native 0.75 Introduces New Architecture', category: 'Mobile Development', source: 'Meta Developers' },
      { title: 'iOS 18 Features Advanced SwiftUI Components', category: 'Mobile Development', source: 'iOS Dev Weekly' },
      { title: 'Android 15 Enhances Privacy and Security Features', category: 'Mobile Development', source: 'Android Developers Blog' },
      { title: 'Cross-Platform Development Tools Reach Maturity', category: 'Mobile Development', source: 'TechRadar' },
      { title: '5G Integration Transforms Mobile App Capabilities', category: 'Mobile Development', source: 'The Verge' },
      { title: 'Progressive Web Apps Gain Native App Store Support', category: 'Mobile Development', source: 'Google Developers' },
      { title: 'Mobile AR Development Frameworks Advance Rapidly', category: 'Mobile Development', source: 'TechCrunch' },
      
      // Data Science News Pool
      { title: 'Large Language Models Revolutionize Data Analysis', category: 'Data Science', source: 'Towards Data Science' },
      { title: 'AutoML Platforms Democratize Machine Learning', category: 'Data Science', source: 'KDnuggets' },
      { title: 'Real-Time Analytics Reach Petabyte Scale Processing', category: 'Data Science', source: 'VentureBeat' },
      { title: 'Federated Learning Enables Privacy-Preserving AI', category: 'Data Science', source: 'MIT Technology Review' },
      { title: 'Quantum Machine Learning Shows Promising Results', category: 'Data Science', source: 'Nature' },
      { title: 'MLOps Adoption Accelerates in Enterprise Environments', category: 'Data Science', source: 'TechCrunch' },
      { title: 'Data Mesh Architecture Transforms Enterprise Analytics', category: 'Data Science', source: 'Towards Data Science' },
      { title: 'Synthetic Data Generation Solves Privacy Challenges', category: 'Data Science', source: 'KDnuggets' },
      
      // DevOps News Pool
      { title: 'Kubernetes 1.30 Introduces Advanced Security Features', category: 'DevOps', source: 'Kubernetes Blog' },
      { title: 'Docker Desktop Adds AI-Powered Container Optimization', category: 'DevOps', source: 'Docker Blog' },
      { title: 'GitOps Practices Become Industry Standard', category: 'DevOps', source: 'GitHub Blog' },
      { title: 'Infrastructure as Code Adoption Reaches 85%', category: 'DevOps', source: 'HashiCorp Blog' },
      { title: 'CI/CD Pipelines Integrate Advanced Testing Automation', category: 'DevOps', source: 'Stack Overflow Blog' },
      { title: 'Observability Tools Enhance System Reliability', category: 'DevOps', source: 'New Relic Blog' },
      { title: 'Platform Engineering Emerges as Key DevOps Trend', category: 'DevOps', source: 'TechCrunch' },
      { title: 'Service Mesh Adoption Simplifies Microservices', category: 'DevOps', source: 'Kubernetes Blog' },
      
      // Programming News Pool
      { title: 'Rust Programming Language Gains Enterprise Adoption', category: 'Programming', source: 'Stack Overflow Blog' },
      { title: 'Python 3.13 Introduces Performance Improvements', category: 'Programming', source: 'Python.org' },
      { title: 'TypeScript 5.5 Features Advanced Type System', category: 'Programming', source: 'Microsoft Blog' },
      { title: 'Go 1.23 Enhances Concurrency Capabilities', category: 'Programming', source: 'Go Blog' },
      { title: 'WebAssembly Adoption Grows in Enterprise Applications', category: 'Programming', source: 'Mozilla Blog' },
      { title: 'Low-Code Platforms Transform Software Development', category: 'Programming', source: 'Gartner' },
      { title: 'Functional Programming Paradigms Gain Popularity', category: 'Programming', source: 'Dev.to' },
      { title: 'Code Quality Tools Integrate AI-Powered Analysis', category: 'Programming', source: 'GitHub Blog' },
      
      // Startups News Pool
      { title: 'AI Startup Raises $100M Series A for Code Generation', category: 'Startups', source: 'TechCrunch' },
      { title: 'Quantum Computing Startup Achieves Breakthrough', category: 'Startups', source: 'VentureBeat' },
      { title: 'Fintech Unicorn Revolutionizes Digital Payments', category: 'Startups', source: 'Product Hunt' },
      { title: 'Climate Tech Startups Attract Record Investment', category: 'Startups', source: 'Y Combinator' },
      { title: 'EdTech Platform Reaches 50 Million Students', category: 'Startups', source: 'Fast Company' },
      { title: 'HealthTech Innovation Transforms Patient Care', category: 'Startups', source: 'TechCrunch' },
      { title: 'Space Tech Startup Launches Satellite Constellation', category: 'Startups', source: 'VentureBeat' },
      { title: 'Robotics Startup Automates Warehouse Operations', category: 'Startups', source: 'Product Hunt' },
      
      // Business News Pool
      { title: 'Remote Work Technology Spending Increases 250%', category: 'Business', source: 'Harvard Business Review' },
      { title: 'Digital Transformation Accelerates Across Industries', category: 'Business', source: 'McKinsey' },
      { title: 'Sustainability Metrics Drive Technology Investments', category: 'Business', source: 'Fast Company' },
      { title: 'Automation Reshapes Workforce Development Strategies', category: 'Business', source: 'MIT Sloan' },
      { title: 'Data Privacy Regulations Impact Global Tech Companies', category: 'Business', source: 'Harvard Business Review' },
      { title: 'Venture Capital Funding Reaches New Heights in Q4', category: 'Business', source: 'PitchBook' },
      { title: 'Enterprise Software Market Grows 15% Annually', category: 'Business', source: 'Fast Company' },
      { title: 'Tech Talent Shortage Drives Salary Increases', category: 'Business', source: 'Harvard Business Review' },
      
      // Science News Pool
      { title: 'Breakthrough in Quantum Internet Communication', category: 'Science', source: 'Science Magazine' },
      { title: 'Brain-Computer Interfaces Achieve New Milestones', category: 'Science', source: 'Nature' },
      { title: 'Fusion Energy Reactor Achieves Net Energy Gain', category: 'Science', source: 'MIT Technology Review' },
      { title: 'Space Technology Enables Global Internet Coverage', category: 'Science', source: 'SpaceX Blog' },
      { title: 'Biotechnology Advances Personalized Medicine', category: 'Science', source: 'Nature Biotechnology' },
      { title: 'Renewable Energy Storage Breakthrough Announced', category: 'Science', source: 'Clean Technica' },
      { title: 'Gene Editing Technology Treats Rare Diseases', category: 'Science', source: 'Nature' },
      { title: 'Nanotechnology Revolutionizes Drug Delivery', category: 'Science', source: 'Science Magazine' },
      
      // Innovation News Pool
      { title: 'Autonomous Vehicles Achieve Level 5 Automation', category: 'Innovation', source: 'MIT Technology Review' },
      { title: 'Smart Cities Initiative Transforms Urban Planning', category: 'Innovation', source: 'Fast Company' },
      { title: 'Augmented Reality Glasses Enter Consumer Market', category: 'Innovation', source: 'The Verge' },
      { title: 'Sustainable Technology Solutions Combat Climate Change', category: 'Innovation', source: 'Wired' },
      { title: 'Neural Interfaces Enable Direct Brain Control', category: 'Innovation', source: 'Nature' },
      { title: 'Holographic Displays Transform Entertainment Industry', category: 'Innovation', source: 'TechCrunch' },
      { title: 'Advanced Materials Enable Flexible Electronics', category: 'Innovation', source: 'MIT Technology Review' },
      { title: 'Robotic Surgery Systems Improve Patient Outcomes', category: 'Innovation', source: 'Science Magazine' }
    ];

    // Shuffle and select random articles for each refresh
    const shuffledTopics = [...techTopicsPool].sort(() => Math.random() - 0.5);
    const selectedTopics = shuffledTopics.slice(0, Math.min(150, shuffledTopics.length));

    return selectedTopics.map((topic, index) => {
      const publishedDate = new Date();
      publishedDate.setHours(publishedDate.getHours() - Math.floor(Math.random() * 72)); // Random time within last 3 days
      
      const sourceData = newsSources.find(s => s.name === topic.source) || newsSources[0];
      
      return {
        id: `news-${index}-${Date.now()}`,
        title: topic.title,
        description: `${topic.title.split(' ').slice(0, 15).join(' ')}... Read more about this breaking development in ${topic.category.toLowerCase()}.`,
        url: `${sourceData.url}/article/${topic.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
        source: topic.source,
        publishedAt: publishedDate.toISOString(),
        urlToImage: getCategoryThumbnail(topic.category, topic.title),
        category: topic.category,
        author: `${topic.source} Editorial Team`,
        content: `This is a comprehensive article about ${topic.title.toLowerCase()}. The development represents a significant advancement in the field of ${topic.category.toLowerCase()}.`,
        domain: sourceData.url.replace('https://', '').replace('http://', '')
      };
    });
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  // Auto-refresh news every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const allArticles = generateTechNews();
      
      let filteredArticles = allArticles;
      if (selectedCategory !== 'All') {
        filteredArticles = allArticles.filter(article => 
          article.category === selectedCategory
        );
      }
      
      if (searchTerm) {
        filteredArticles = filteredArticles.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setArticles(filteredArticles);
      setLastRefresh(new Date());
    } catch (err) {
      setError('Failed to fetch news articles');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleHover = async (articleId: string, url: string) => {
    setHoveredArticle(articleId);
    
    // Simulate fetching preview data
    const mockPreviewData = {
      title: 'Article Preview',
      description: 'This is a preview of the article content...',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      domain: url.split('/')[2] || 'example.com',
      readTime: '3 min read',
      tags: ['Technology', 'Innovation', 'News']
    };
    
    setPreviewData(mockPreviewData);
  };

  const openArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech News</h1>
            <p className="text-gray-600">Stay updated with the latest technology trends and announcements from {newsSources.length}+ sources</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: {lastRefresh.toLocaleTimeString()}</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
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
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Newspaper className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{articles.length}</span>
          </div>
          <p className="text-sm text-gray-600">Total Articles</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{newsSources.length}</span>
          </div>
          <p className="text-sm text-gray-600">News Sources</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">{categories.length - 1}</span>
          </div>
          <p className="text-sm text-gray-600">Categories</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">24/7</span>
          </div>
          <p className="text-sm text-gray-600">Live Updates</p>
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
              placeholder="Search news articles..."
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

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
            <span className="text-gray-600">Loading latest tech news from {newsSources.length} sources...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="text-red-800 font-medium">Error loading news</h3>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={fetchNews}
                className="text-red-600 hover:text-red-800 text-sm underline mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      {!loading && (
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredArticles.map((article, index) => (
                <article 
                  key={article.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 relative group"
                  onMouseEnter={() => handleArticleHover(article.id, article.url)}
                  onMouseLeave={() => {
                    setHoveredArticle(null);
                    setPreviewData(null);
                  }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getCategoryThumbnail(article.category, article.title);
                        }}
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-primary-600 font-medium">{article.category}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{article.source}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{getTimeAgo(article.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bookmark className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => openArticle(article.url)}
                            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <h2 
                        className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer transition-colors line-clamp-2"
                        onClick={() => openArticle(article.url)}
                      >
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{Math.floor(Math.random() * 10000) + 1000} views</span>
                          </div>
                          <span>3 min read</span>
                        </div>
                        <button 
                          onClick={() => openArticle(article.url)}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors flex items-center space-x-1"
                        >
                          <span>Read More</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Preview */}
                  {hoveredArticle === article.id && previewData && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-10">
                      <div className="flex items-start space-x-3">
                        <img
                          src={previewData.image}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">Quick Preview</h4>
                          <p className="text-xs text-gray-600 mb-2">{previewData.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{previewData.domain}</span>
                            <span>{previewData.readTime}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {previewData.tags.map((tag: string, tagIndex: number) => (
                              <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* News Sources */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">News Sources ({newsSources.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {newsSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{source.favicon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                          {source.name}
                        </h4>
                        <p className="text-xs text-gray-500">{source.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.open(source.url, '_blank')}
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['AI Breakthroughs', 'React 19', 'Quantum Computing', 'Web3 Security', 'Cloud AI', 'Cybersecurity', 'Blockchain', 'DevOps'].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <span className="text-sm font-medium text-gray-700">{topic}</span>
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-primary-100 text-sm mb-4">
                Get the latest tech news delivered to your inbox from {newsSources.length}+ sources
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-400 focus:outline-none"
                />
                <button className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Subscribe to News
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default News;