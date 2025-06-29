import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, X, Send, Bot, Loader2, ExternalLink, Youtube, BookOpen, Search, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  links?: Array<{
    title: string;
    url: string;
    type: 'youtube' | 'course' | 'resource';
    description?: string;
  }>;
}

interface CourseResource {
  title: string;
  url: string;
  type: 'youtube' | 'course' | 'documentation';
  description: string;
  category: string;
}

const StudyAssistantChatbot: React.FC = () => {
  const { firebaseUser } = useAuth();
  const [isOpen, setIsOpen] = useState(true); // Open by default
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Comprehensive course database
  const courseDatabase: CourseResource[] = [
    // Python Resources
    { title: 'Complete Python Programming Course - Programming with Mosh', url: 'https://youtube.com/playlist?list=PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f', type: 'youtube', description: 'Learn Python from scratch with hands-on projects', category: 'python' },
    { title: 'Python for Data Science - freeCodeCamp', url: 'https://youtube.com/playlist?list=PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1', type: 'youtube', description: 'Master Python for data science with pandas and numpy', category: 'python' },
    { title: 'Django Web Development - Traversy Media', url: 'https://youtube.com/playlist?list=PLillGF-RfqbbyKq4GmxwAi9AA8HGmCe23', type: 'youtube', description: 'Build web applications with Django framework', category: 'python' },
    { title: 'Python Official Documentation', url: 'https://docs.python.org/3/', type: 'documentation', description: 'Official Python documentation and tutorials', category: 'python' },
    
    // JavaScript Resources
    { title: 'JavaScript Complete Course - The Net Ninja', url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET', type: 'youtube', description: 'Master modern JavaScript with ES6+ features', category: 'javascript' },
    { title: 'JavaScript Algorithms and Data Structures - freeCodeCamp', url: 'https://youtube.com/playlist?list=PLWKjhJtqVAbnRT_hue-3zyiuIYj0OlpyG', type: 'youtube', description: 'Learn algorithms and data structures in JavaScript', category: 'javascript' },
    { title: '30 JavaScript Projects - JavaScript Mastery', url: 'https://youtube.com/playlist?list=PLillGF-Rfqbbnyz23-MCO_fwbNJtmrEcX', type: 'youtube', description: 'Build 30 real-world JavaScript projects', category: 'javascript' },
    { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'documentation', description: 'Comprehensive JavaScript documentation by Mozilla', category: 'javascript' },
    
    // React Resources
    { title: 'React Complete Course - Academind', url: 'https://youtube.com/playlist?list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS', type: 'youtube', description: 'Master React with hooks, context, and Redux', category: 'react' },
    { title: 'React Projects - JavaScript Mastery', url: 'https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu', type: 'youtube', description: 'Build 15 real-world React applications', category: 'react' },
    { title: 'React Official Documentation', url: 'https://react.dev/', type: 'documentation', description: 'Official React documentation and tutorials', category: 'react' },
    
    // Node.js Resources
    { title: 'Node.js Complete Course - The Net Ninja', url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU', type: 'youtube', description: 'Learn Node.js for backend development', category: 'nodejs' },
    { title: 'Express.js REST API - Traversy Media', url: 'https://youtube.com/playlist?list=PLillGF-RfqbYRpji8t7SxUllnxkqHJHuH', type: 'youtube', description: 'Build RESTful APIs with Express.js', category: 'nodejs' },
    { title: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs/', type: 'documentation', description: 'Official Node.js documentation and guides', category: 'nodejs' },
    
    // Machine Learning Resources
    { title: 'Machine Learning with Python - freeCodeCamp', url: 'https://youtube.com/playlist?list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s', type: 'youtube', description: 'Learn ML algorithms with Python and scikit-learn', category: 'machine learning' },
    { title: 'TensorFlow Deep Learning - TensorFlow', url: 'https://youtube.com/playlist?list=PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx', type: 'youtube', description: 'Master deep learning with TensorFlow', category: 'machine learning' },
    { title: 'PyTorch Deep Learning - Daniel Bourke', url: 'https://youtube.com/playlist?list=PLZbbT5o_s2xrfNyHZsM6ufI0iZENK9xgG', type: 'youtube', description: 'Learn PyTorch for deep learning projects', category: 'machine learning' },
    
    // Java Resources
    { title: 'Java Programming Complete Course - Derek Banas', url: 'https://youtube.com/playlist?list=PLE7E8B7F4856C9B19', type: 'youtube', description: 'Complete Java programming tutorial', category: 'java' },
    { title: 'Spring Boot Tutorial - Java Brains', url: 'https://youtube.com/playlist?list=PLqq-6Pq4lTTbx8p2oCgcAQGQyqN8XeA1x', type: 'youtube', description: 'Master Spring Boot framework', category: 'java' },
    { title: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/', type: 'documentation', description: 'Official Java documentation by Oracle', category: 'java' },
    
    // C++ Resources
    { title: 'C++ Programming - CodeWithHarry', url: 'https://youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL', type: 'youtube', description: 'Learn C++ from basics to advanced', category: 'cpp' },
    { title: 'Advanced C++ - The Cherno', url: 'https://youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb', type: 'youtube', description: 'Advanced C++ concepts and optimization', category: 'cpp' },
    
    // Mobile Development
    { title: 'React Native Complete Course - Academind', url: 'https://youtube.com/playlist?list=PL55RiY5tL51rrC3sh8PjEzEZKfmLuFGsm', type: 'youtube', description: 'Build mobile apps with React Native', category: 'mobile' },
    { title: 'Flutter Complete Course - The Net Ninja', url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ', type: 'youtube', description: 'Learn Flutter and Dart for mobile development', category: 'mobile' },
    
    // Data Science
    { title: 'Data Science with Python - Keith Galli', url: 'https://youtube.com/playlist?list=PLFCB5Dp81iNVmuoGIqcT5oF4K-7kTI5vp', type: 'youtube', description: 'Complete data science course with Python', category: 'data science' },
    
    // Web Development
    { title: 'MERN Stack Course - Traversy Media', url: 'https://youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE', type: 'youtube', description: 'Full-stack development with MERN stack', category: 'web development' },
    { title: 'Vue.js Complete Course - Vue Mastery', url: 'https://youtube.com/playlist?list=PLC3y8-rFHvwgeQIfSDtEGVvvSEPDkL_1f', type: 'youtube', description: 'Master Vue.js framework', category: 'web development' },
    
    // DevOps and Cloud
    { title: 'Docker and Kubernetes - TechWorld with Nana', url: 'https://youtube.com/playlist?list=PLy7NrYWoggjwPggqtFsI_zMAwvG0SqYCb', type: 'youtube', description: 'Learn containerization and orchestration', category: 'devops' },
    { title: 'AWS Complete Course - Simplilearn', url: 'https://youtube.com/playlist?list=PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz', type: 'youtube', description: 'Master Amazon Web Services', category: 'cloud' },
    
    // Cybersecurity
    { title: 'Ethical Hacking Course - The Cyber Mentor', url: 'https://youtube.com/playlist?list=PLLKT__MCUeiwBa7d7F_vN1GUwz_2TmVQj', type: 'youtube', description: 'Learn ethical hacking and penetration testing', category: 'cybersecurity' },
    
    // Game Development
    { title: 'Unity Game Development - Brackeys', url: 'https://youtube.com/playlist?list=PLPV2KyIb3jR5QFsefuO2RlAgWEz6EvVi6', type: 'youtube', description: 'Learn game development with Unity', category: 'game development' },
    
    // Blockchain
    { title: 'Solidity and Blockchain - Dapp University', url: 'https://youtube.com/playlist?list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN', type: 'youtube', description: 'Learn blockchain development with Solidity', category: 'blockchain' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'bot',
        content: `Hi there! 👋 I'm your Study Assistant. I can help you find the best courses, tutorials, and resources for any technology you want to learn. 

Just ask me about any programming language, framework, or tech topic like:
• "Python course for beginners"
• "React tutorials"
• "Machine learning resources"
• "Java programming guide"

What would you like to learn today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Search for relevant courses based on user query
  const searchCourses = (query: string): CourseResource[] => {
    const searchTerms = query.toLowerCase().split(' ');
    const results: CourseResource[] = [];
    
    courseDatabase.forEach(course => {
      const courseText = `${course.title} ${course.description} ${course.category}`.toLowerCase();
      const relevanceScore = searchTerms.reduce((score, term) => {
        if (courseText.includes(term)) {
          // Higher score for category matches
          if (course.category.includes(term)) score += 3;
          // Medium score for title matches
          else if (course.title.toLowerCase().includes(term)) score += 2;
          // Lower score for description matches
          else score += 1;
        }
        return score;
      }, 0);
      
      if (relevanceScore > 0) {
        results.push(course);
      }
    });
    
    // Sort by relevance and return top 5
    return results.sort((a, b) => {
      const aScore = searchTerms.reduce((score, term) => {
        const aText = `${a.title} ${a.description} ${a.category}`.toLowerCase();
        return aText.includes(term) ? score + 1 : score;
      }, 0);
      const bScore = searchTerms.reduce((score, term) => {
        const bText = `${b.title} ${b.description} ${b.category}`.toLowerCase();
        return bText.includes(term) ? score + 1 : score;
      }, 0);
      return bScore - aScore;
    }).slice(0, 5);
  };

  // Generate dynamic responses using DeepSeek API
  const generateAIResponse = async (userQuery: string, foundCourses: CourseResource[]): Promise<string> => {
    try {
      setIsLoading(true);
      
      const prompt = `You are a helpful study assistant for SkillSync Academy. A student asked: "${userQuery}"

I found these relevant courses:
${foundCourses.map(course => `- ${course.title}: ${course.description}`).join('\n')}

Please provide a helpful, encouraging response that:
1. Acknowledges their learning goal
2. Briefly explains why these resources are good for them
3. Gives 1-2 practical tips for learning this topic
4. Keeps the tone friendly and motivating
5. Keep response under 150 words

Don't mention the course links in your response as they will be shown separately.`;

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || generateFallbackResponse(userQuery, foundCourses);
    } catch (error) {
      console.error('DeepSeek API error:', error);
      return generateFallbackResponse(userQuery, foundCourses);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback response generator
  const generateFallbackResponse = (userQuery: string, foundCourses: CourseResource[]): string => {
    const responses = [
      `Great choice! Learning ${userQuery} is a valuable skill. I've found some excellent resources that will help you master this topic step by step.`,
      `Perfect! ${userQuery} is in high demand right now. These courses will give you a solid foundation and practical experience.`,
      `Excellent question! I've curated the best ${userQuery} resources for you. Start with the beginner-friendly ones and work your way up.`,
      `Smart move! ${userQuery} is a great technology to learn. These resources cover everything from basics to advanced concepts.`,
      `Awesome! I've found some top-rated ${userQuery} courses that thousands of students have used successfully.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (foundCourses.length === 0) {
      return `I understand you're interested in ${userQuery}. While I don't have specific courses for that exact topic in my database, I'd recommend checking our main Courses and YouTube Courses sections for related content. You can also try searching for broader terms like "programming", "web development", or "data science".`;
    }
    
    return `${randomResponse} 

💡 **Pro tip**: Start with the fundamentals and practice regularly. Building projects is the best way to solidify your learning!`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = userInput;
    setUserInput('');
    setIsTyping(true);

    // Search for relevant courses
    const foundCourses = searchCourses(query);
    
    // Generate AI response
    const aiResponse = await generateAIResponse(query, foundCourses);

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
        links: foundCourses.map(course => ({
          title: course.title,
          url: course.url,
          type: course.type as 'youtube' | 'course' | 'resource',
          description: course.description
        }))
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getIconForLinkType = (type: string) => {
    switch (type) {
      case 'youtube': return <Youtube className="h-4 w-4 text-red-500" />;
      case 'course': return <BookOpen className="h-4 w-4 text-blue-500" />;
      default: return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  // Don't render if user hasn't logged in
  if (!firebaseUser) {
    return null;
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            <Sparkles className="h-3 w-3" />
          </div>
        </button>
      )}

      {/* Chatbot Window - Increased Height */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-96 h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Study Assistant</h3>
                <p className="text-xs text-blue-100">Find courses & resources</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Course Links */}
                  {message.links && message.links.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-medium text-gray-600 border-t pt-2">📚 Recommended Resources:</p>
                      {message.links.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => openLink(link.url)}
                          className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                        >
                          <div className="flex items-start space-x-2">
                            {getIconForLinkType(link.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">{link.title}</p>
                              {link.description && (
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{link.description}</p>
                              )}
                            </div>
                            <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-2xl shadow-sm border">
                  <div className="flex items-center space-x-2">
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    ) : (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">
                      {isLoading ? 'Thinking...' : 'Typing...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any technology..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask about Python, React, ML, Java, or any tech topic!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StudyAssistantChatbot;