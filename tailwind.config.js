/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-soft': 'bounce 1s infinite',
        'shapeWave': 'shapeWave 2.4s ease infinite',
        'triangleWave': 'triangleWave 2.4s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shapeWave: {
          '0%': {
            transform: 'translate3d(0,0,0) scale(1) rotateY(0deg)',
            backgroundColor: '#ff0080',
            boxShadow: '0 0 15px rgba(255, 0, 128, 0.3)',
          },
          '12%': {
            transform: 'translate3d(4px,-8px,4px) scale(1.3) rotateY(15deg)',
            backgroundColor: '#ff4080',
            boxShadow: '0 0 25px rgba(255, 64, 128, 0.8), 0 0 50px rgba(255, 64, 128, 0.4)',
          },
          '15%': {
            backgroundColor: '#ff8040',
            boxShadow: '0 0 30px rgba(255, 128, 64, 0.9), 0 0 60px rgba(255, 128, 64, 0.5)',
          },
          '24%': {
            transform: 'translate3d(0,0,0) scale(1) rotateY(0deg)',
            backgroundColor: '#ffff00',
            boxShadow: '0 0 25px rgba(255, 255, 0, 0.7), 0 0 50px rgba(255, 255, 0, 0.3)',
          },
          '36%': {
            backgroundColor: '#80ff40',
            boxShadow: '0 0 20px rgba(128, 255, 64, 0.6), 0 0 40px rgba(128, 255, 64, 0.2)',
          },
          '48%': {
            backgroundColor: '#40ff80',
            boxShadow: '0 0 18px rgba(64, 255, 128, 0.5), 0 0 35px rgba(64, 255, 128, 0.2)',
          },
          '60%': {
            backgroundColor: '#00ffff',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)',
          },
          '72%': {
            backgroundColor: '#4080ff',
            boxShadow: '0 0 12px rgba(64, 128, 255, 0.3), 0 0 25px rgba(64, 128, 255, 0.15)',
          },
          '84%': {
            backgroundColor: '#8040ff',
            boxShadow: '0 0 10px rgba(128, 64, 255, 0.25), 0 0 20px rgba(128, 64, 255, 0.1)',
          },
          '100%': {
            transform: 'scale(1)',
            backgroundColor: '#ff0080',
            boxShadow: '0 0 8px rgba(255, 0, 128, 0.2)',
          },
        },
        triangleWave: {
          '0%': {
            transform: 'translate3d(0,0,0) scale(1) rotateY(0deg)',
            borderBottomColor: '#ff0080',
            filter: 'drop-shadow(0 0 15px rgba(255, 0, 128, 0.3))',
          },
          '12%': {
            transform: 'translate3d(4px,-8px,4px) scale(1.3) rotateY(15deg)',
            borderBottomColor: '#ff4080',
            filter: 'drop-shadow(0 0 25px rgba(255, 64, 128, 0.8))',
          },
          '15%': {
            borderBottomColor: '#ff8040',
            filter: 'drop-shadow(0 0 30px rgba(255, 128, 64, 0.9))',
          },
          '24%': {
            transform: 'translate3d(0,0,0) scale(1) rotateY(0deg)',
            borderBottomColor: '#ffff00',
            filter: 'drop-shadow(0 0 25px rgba(255, 255, 0, 0.7))',
          },
          '36%': {
            borderBottomColor: '#80ff40',
            filter: 'drop-shadow(0 0 20px rgba(128, 255, 64, 0.6))',
          },
          '48%': {
            borderBottomColor: '#40ff80',
            filter: 'drop-shadow(0 0 18px rgba(64, 255, 128, 0.5))',
          },
          '60%': {
            borderBottomColor: '#00ffff',
            filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.4))',
          },
          '72%': {
            borderBottomColor: '#4080ff',
            filter: 'drop-shadow(0 0 12px rgba(64, 128, 255, 0.3))',
          },
          '84%': {
            borderBottomColor: '#8040ff',
            filter: 'drop-shadow(0 0 10px rgba(128, 64, 255, 0.25))',
          },
          '100%': {
            transform: 'scale(1)',
            borderBottomColor: '#ff0080',
            filter: 'drop-shadow(0 0 8px rgba(255, 0, 128, 0.2))',
          },
        },
      },
      borderWidth: {
        '7': '7px',
      },
    },
  },
  plugins: [],
};