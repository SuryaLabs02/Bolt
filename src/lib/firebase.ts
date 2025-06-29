import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Check if Firebase configuration is properly set
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => 
  !import.meta.env[varName] || 
  import.meta.env[varName].includes('your_') || 
  import.meta.env[varName].includes('demo-') ||
  import.meta.env[varName] === 'your-project.firebaseapp.com' ||
  import.meta.env[varName] === 'your-project-id' ||
  import.meta.env[varName] === 'your-project.appspot.com' ||
  import.meta.env[varName] === '123456789' ||
  import.meta.env[varName] === '1:123456789:web:abcdef'
);

if (missingVars.length > 0) {
  console.error('❌ Firebase Configuration Error:');
  console.error('Missing or invalid Firebase environment variables:', missingVars);
  console.error('Please set up your Firebase project and update the .env file with actual values.');
  console.error('Get your config from: https://console.firebase.google.com -> Your Project -> Project Settings -> General -> Your apps');
}

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Initialize Firebase only if configuration is valid
let app;
let auth;
let database;
let googleProvider;

try {
  if (missingVars.length === 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
    googleProvider = new GoogleAuthProvider();
    
    // Configure Google provider
    googleProvider.addScope('email');
    googleProvider.addScope('profile');
    
    console.log('✅ Firebase initialized successfully');
    console.log('🔥 Project ID:', firebaseConfig.projectId);
    console.log('🌐 Auth Domain:', firebaseConfig.authDomain);
  } else {
    console.warn('⚠️ Firebase not initialized due to missing configuration');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

// Export with proper error handling
export { auth, database, googleProvider };
export const isFirebaseConfigured = missingVars.length === 0;
export default app;