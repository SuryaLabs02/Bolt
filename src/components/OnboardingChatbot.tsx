import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, X, Send, User, Github, Code, Sparkles, ArrowRight, SkipBack as Skip, CheckCircle, Bot } from 'lucide-react';
import { ref, set, get } from 'firebase/database';
import { database, isFirebaseConfigured } from '../lib/firebase';

interface UserProfile {
  name: string;
  bio: string;
  githubId: string;
  skills: string[];
  interests: string[];
  experience: string;
  goals: string[];
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  inputType?: 'text' | 'multiselect' | 'select';
}

const OnboardingChatbot: React.FC = () => {
  const { user, firebaseUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    bio: '',
    githubId: '',
    skills: [],
    interests: [],
    experience: '',
    goals: []
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const skillOptions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'Go',
    'Machine Learning', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'DevOps',
    'Mobile Development', 'Game Development', 'Blockchain', 'AI/ML', 'Web Development'
  ];

  const interestOptions = [
    'Web Development', 'Mobile Apps', 'AI & Machine Learning', 'Data Science',
    'Cybersecurity', 'Cloud Computing', 'Game Development', 'Blockchain',
    'DevOps', 'UI/UX Design', 'Backend Development', 'Frontend Development'
  ];

  const experienceOptions = [
    'Complete Beginner', 'Some Experience', 'Intermediate', 'Advanced', 'Expert'
  ];

  const goalOptions = [
    'Get a Job', 'Career Change', 'Skill Improvement', 'Personal Projects',
    'Freelancing', 'Start a Business', 'Academic Learning', 'Stay Updated'
  ];

  const onboardingSteps = [
    {
      id: 'welcome',
      botMessage: `Hey there! 👋 I'm SkillBot, your personal learning assistant. I'm here to help personalize your SkillSync Academy experience! 

Let's get to know each other better. What should I call you?`,
      inputType: 'text' as const,
      field: 'name',
      placeholder: 'Enter your preferred name...'
    },
    {
      id: 'bio',
      botMessage: `Nice to meet you, {name}! 🎉 

Tell me a bit about yourself. What's your background or what brings you to SkillSync Academy?`,
      inputType: 'text' as const,
      field: 'bio',
      placeholder: 'Tell me about yourself...'
    },
    {
      id: 'github',
      botMessage: `Awesome! 💻 

Do you have a GitHub profile? If yes, please share your GitHub username (just the username, not the full URL). This helps me understand your coding journey!`,
      inputType: 'text' as const,
      field: 'githubId',
      placeholder: 'Enter your GitHub username...',
      optional: true
    },
    {
      id: 'skills',
      botMessage: `Great! Now let's talk about your technical skills. 🚀

Which of these technologies are you familiar with? (Select all that apply)`,
      inputType: 'multiselect' as const,
      field: 'skills',
      options: skillOptions
    },
    {
      id: 'interests',
      botMessage: `Excellent choices! 🎯 

What areas of technology are you most interested in learning about?`,
      inputType: 'multiselect' as const,
      field: 'interests',
      options: interestOptions
    },
    {
      id: 'experience',
      botMessage: `Perfect! 📚 

How would you describe your overall programming experience?`,
      inputType: 'select' as const,
      field: 'experience',
      options: experienceOptions
    },
    {
      id: 'goals',
      botMessage: `Almost done! 🎯 

What are your main goals for learning on SkillSync Academy? (Select all that apply)`,
      inputType: 'multiselect' as const,
      field: 'goals',
      options: goalOptions
    },
    {
      id: 'complete',
      botMessage: `🎉 Fantastic! I've got everything I need to personalize your learning experience.

Your profile has been saved and I'll use this information to recommend the best courses and resources for you. 

Welcome to SkillSync Academy, {name}! Ready to start your tech journey? 🚀`,
      inputType: 'none' as const,
      field: 'complete'
    }
  ];

  // Test Firebase connection
  useEffect(() => {
    const testFirebaseConnection = async () => {
      if (!isFirebaseConfigured || !database) {
        console.error('❌ Firebase is not properly configured');
        setSaveError('Firebase is not properly configured. Please check your environment variables.');
        return;
      }

      try {
        // Test write to Firebase
        const testRef = ref(database, 'test/connection');
        await set(testRef, {
          timestamp: new Date().toISOString(),
          message: 'Connection test successful'
        });
        console.log('✅ Firebase connection test successful');
        
        // Clean up test data
        await set(testRef, null);
      } catch (error) {
        console.error('❌ Firebase connection test failed:', error);
        setSaveError(`Firebase connection failed: ${error}`);
      }
    };

    testFirebaseConnection();
  }, []);

  // Check if user has completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!firebaseUser) {
        setIsLoading(false);
        return;
      }

      if (!isFirebaseConfigured || !database) {
        console.error('❌ Firebase not configured, skipping onboarding check');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Checking onboarding status for user:', firebaseUser.uid);
        const userRef = ref(database, `users/${firebaseUser.uid}/profile`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const profileData = snapshot.val();
          console.log('✅ Found existing profile:', profileData);
          setHasCompletedOnboarding(true);
          setUserProfile(profileData);
        } else {
          console.log('📝 No existing profile found, showing onboarding');
          // Show chatbot for new users after a short delay
          setTimeout(() => {
            setIsOpen(true);
            initializeChat();
          }, 2000);
        }
      } catch (error) {
        console.error('❌ Error checking onboarding status:', error);
        setSaveError(`Error checking onboarding: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [firebaseUser]);

  const initializeChat = () => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'bot',
      content: onboardingSteps[0].botMessage,
      timestamp: new Date(),
      inputType: onboardingSteps[0].inputType
    };
    setMessages([welcomeMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (content: string, inputType: string = 'text', options?: string[]) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content: content.replace('{name}', userProfile.name || 'there'),
        timestamp: new Date(),
        inputType: inputType as any,
        options
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    const currentStepData = onboardingSteps[currentStep];
    let responseText = '';
    let newProfileData = { ...userProfile };

    if (currentStepData.inputType === 'text') {
      if (!userInput.trim() && !currentStepData.optional) return;
      
      responseText = userInput.trim() || 'Skipped';
      newProfileData[currentStepData.field as keyof UserProfile] = userInput.trim() as any;
    } else if (currentStepData.inputType === 'select') {
      if (selectedOptions.length === 0) return;
      
      responseText = selectedOptions[0];
      newProfileData[currentStepData.field as keyof UserProfile] = selectedOptions[0] as any;
    } else if (currentStepData.inputType === 'multiselect') {
      if (selectedOptions.length === 0) return;
      
      responseText = selectedOptions.join(', ');
      newProfileData[currentStepData.field as keyof UserProfile] = selectedOptions as any;
    }

    addUserMessage(responseText);
    setUserProfile(newProfileData);
    setUserInput('');
    setSelectedOptions([]);

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < onboardingSteps.length) {
      setCurrentStep(nextStep);
      const nextStepData = onboardingSteps[nextStep];
      
      setTimeout(() => {
        addBotMessage(
          nextStepData.botMessage,
          nextStepData.inputType,
          nextStepData.options
        );
      }, 1500);
    } else {
      // Save to Firebase and complete onboarding
      await saveUserProfile(newProfileData);
    }
  };

  const saveUserProfile = async (profileData: UserProfile) => {
    if (!firebaseUser) {
      console.error('❌ No Firebase user found');
      setSaveError('No user found. Please sign in again.');
      return;
    }

    if (!isFirebaseConfigured || !database) {
      console.error('❌ Firebase not configured');
      setSaveError('Firebase is not properly configured.');
      return;
    }

    try {
      console.log('💾 Saving user profile:', profileData);
      console.log('👤 User ID:', firebaseUser.uid);
      
      const userRef = ref(database, `users/${firebaseUser.uid}/profile`);
      const dataToSave = {
        ...profileData,
        completedAt: new Date().toISOString(),
        userId: firebaseUser.uid,
        email: firebaseUser.email
      };
      
      console.log('📤 Data to save:', dataToSave);
      
      await set(userRef, dataToSave);
      
      console.log('✅ Profile saved successfully!');
      setHasCompletedOnboarding(true);
      setSaveError(null);
      
      // Add success message
      addBotMessage('✅ Your profile has been saved successfully! Welcome to SkillSync Academy!');
      
      // Show completion message
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('❌ Error saving user profile:', error);
      setSaveError(`Failed to save profile: ${error}`);
      
      // Add error message to chat
      addBotMessage('❌ Sorry, there was an error saving your profile. Please try again or contact support.');
    }
  };

  const handleSkip = () => {
    addUserMessage('Skipped');
    
    const nextStep = currentStep + 1;
    if (nextStep < onboardingSteps.length) {
      setCurrentStep(nextStep);
      const nextStepData = onboardingSteps[nextStep];
      
      setTimeout(() => {
        addBotMessage(
          nextStepData.botMessage,
          nextStepData.inputType,
          nextStepData.options
        );
      }, 1500);
    }
  };

  const handleOptionToggle = (option: string) => {
    const currentStepData = onboardingSteps[currentStep];
    
    if (currentStepData.inputType === 'select') {
      setSelectedOptions([option]);
    } else if (currentStepData.inputType === 'multiselect') {
      setSelectedOptions(prev => 
        prev.includes(option) 
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Don't render if user hasn't logged in or has completed onboarding
  if (!firebaseUser || hasCompletedOnboarding || isLoading) {
    return null;
  }

  return (
    <>
      {/* Error Display */}
      {saveError && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
          <div className="flex items-start space-x-2">
            <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Firebase Error</p>
              <p className="text-sm">{saveError}</p>
            </div>
            <button 
              onClick={() => setSaveError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            !
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">SkillBot</h3>
                <p className="text-xs text-purple-100">Your Learning Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Setup Progress</span>
              <span>{currentStep + 1}/{onboardingSteps.length}</span>
            </div>
            <div className="bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {currentStep + 1} of {onboardingSteps.length} preparation steps completed
            </p>
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
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
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
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {currentStep < onboardingSteps.length && (
            <div className="p-4 bg-white border-t border-gray-200">
              {onboardingSteps[currentStep]?.inputType === 'text' && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={onboardingSteps[currentStep].placeholder}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() && !onboardingSteps[currentStep].optional}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                  {onboardingSteps[currentStep].optional && (
                    <button
                      onClick={handleSkip}
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm transition-colors"
                    >
                      Skip
                    </button>
                  )}
                </div>
              )}

              {(onboardingSteps[currentStep]?.inputType === 'select' || onboardingSteps[currentStep]?.inputType === 'multiselect') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {onboardingSteps[currentStep].options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionToggle(option)}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          selectedOptions.includes(option)
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSendMessage}
                      disabled={selectedOptions.length === 0}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleSkip}
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm transition-colors flex items-center space-x-1"
                    >
                      <Skip className="h-4 w-4" />
                      <span>Skip</span>
                    </button>
                  </div>
                </div>
              )}

              {onboardingSteps[currentStep]?.inputType === 'none' && (
                <div className="text-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors text-sm flex items-center space-x-2 mx-auto"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Get Started!</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OnboardingChatbot;