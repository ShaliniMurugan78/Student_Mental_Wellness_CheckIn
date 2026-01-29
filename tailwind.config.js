/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'calm-blue': '#A6C4DD',
            'calm-green': '#B2D8B2',
            'calm-purple': '#C8B8E6',
            'calm-pink': '#F4C7C7',
            'calm-yellow': '#F9E4A6',
            'dark-text': '#334155',
            'light-bg': '#F8FAFC',
          },
          fontFamily: {
            sans: ['"Inter"', 'sans-serif'],
          },
          boxShadow: {
            'soft': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
            'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          keyframes: {
            'fade-in': {
              '0%': { opacity: '0', transform: 'translateY(10px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            'breathe': {
              '0%, 100%': { transform: 'scale(0.8)' },
              '50%': { transform: 'scale(1.1)' },
            }
          },
          animation: {
            'fade-in': 'fade-in 0.5s ease-out forwards',
            'breathe': 'breathe 8s ease-in-out infinite',
          }
        },
      },
      plugins: [],
    }