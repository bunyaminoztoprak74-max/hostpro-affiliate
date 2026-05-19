import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0eaff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
      'quiz-in': 'quizIn 0.25s ease-out',
    },
    keyframes: {
      quizIn: {
        '0%': { opacity: '0', transform: 'translateY(14px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'card-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'blue-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'green-gradient': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'orange-gradient': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      },
    },
  },
  plugins: [],
}
export default config

