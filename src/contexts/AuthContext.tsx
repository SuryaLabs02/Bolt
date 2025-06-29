import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  points: number;
  achievements: string[];
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  isFirebaseReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      if (firebaseUser) {
        setUserFromFirebaseUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return;
    }

    // Check for redirect result on app load
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Google sign-in via redirect successful:', result.user);
          // User will be set automatically via onAuthStateChanged
        }
      } catch (error: any) {
        console.error('Redirect result error:', error);
      }
    };

    checkRedirectResult();
  }, []);

  const setUserFromFirebaseUser = (firebaseUser: FirebaseUser) => {
    const userData: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      email: firebaseUser.email || '',
      avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User')}&background=3b82f6&color=fff`,
      level: 'Beginner',
      points: 0,
      achievements: []
    };
    setUser(userData);
    localStorage.setItem('skillsync_user', JSON.stringify(userData));
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      throw new Error('Firebase is not properly configured. Please check your environment variables and Firebase setup.');
    }

    try {
      console.log('Attempting Google sign-in with popup...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
      // User will be set automatically via onAuthStateChanged
    } catch (error: any) {
      console.error('Google sign-in popup error:', error);
      
      // Check for Firebase popup-blocked error specifically
      if (error.code === 'auth/popup-blocked' || 
          error.name === 'FirebaseError' && error.message.includes('popup-blocked')) {
        console.log('Pop-up blocked detected, attempting redirect method...');
        try {
          await signInWithRedirect(auth, googleProvider);
          // The redirect will handle the authentication
          // Don't throw an error here as redirect is in progress
          return;
        } catch (redirectError: any) {
          console.error('Google sign-in redirect error:', redirectError);
          throw new Error('Both popup and redirect methods failed. Please try email sign-in or contact support.');
        }
      } else {
        // Handle other types of errors
        let errorMessage = 'Failed to sign in with Google';
        
        switch (error.code) {
          case 'auth/cancelled-popup-request':
            errorMessage = 'Sign-in was cancelled. Please try again.';
            break;
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in popup was closed. Please try again.';
            break;
          case 'auth/unauthorized-domain':
            errorMessage = 'This domain is not authorized for Google sign-in.';
            break;
          case 'auth/api-key-not-valid':
            errorMessage = 'Firebase configuration error. Please check your API key.';
            break;
          default:
            errorMessage = error.message || 'Failed to sign in with Google';
        }
        
        throw new Error(errorMessage);
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not properly configured. Please check your environment variables and Firebase setup.');
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email sign-in successful:', result.user);
      // User will be set automatically via onAuthStateChanged
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      let errorMessage = 'Failed to sign in';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/api-key-not-valid':
          errorMessage = 'Firebase configuration error. Please check your Firebase setup.';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in';
      }
      
      throw new Error(errorMessage);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase is not properly configured. Please check your environment variables and Firebase setup.');
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(result.user, {
        displayName: name
      });
      
      console.log('Email sign-up successful:', result.user);
      // User will be set automatically via onAuthStateChanged
    } catch (error: any) {
      console.error('Email sign-up error:', error);
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/api-key-not-valid':
          errorMessage = 'Firebase configuration error. Please check your Firebase setup.';
          break;
        default:
          errorMessage = error.message || 'Failed to create account';
      }
      
      throw new Error(errorMessage);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('skillsync_user', JSON.stringify(userData));
  };

  const logout = async () => {
    if (!isFirebaseConfigured || !auth) {
      // If Firebase is not configured, just clear local state
      setUser(null);
      setFirebaseUser(null);
      localStorage.removeItem('skillsync_user');
      return;
    }

    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      localStorage.removeItem('skillsync_user');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Failed to sign out');
    }
  };

  const value = {
    user,
    firebaseUser,
    login,
    logout,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    isAuthenticated: !!firebaseUser,
    loading,
    isFirebaseReady: isFirebaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};