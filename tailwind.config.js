/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ansys: {
          blue: '#012172',
          orange: '#FF8C00',
          gray: {
            100: '#F7F8FA',
            200: '#E9ECF1',
            300: '#D1D7E0',
            400: '#A4AFBF',
            500: '#6B7A90',
            600: '#4A5568',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923'
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};