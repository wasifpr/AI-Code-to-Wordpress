import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#dce8ff',
          200: '#bdd4ff',
          300: '#90b8ff',
          400: '#5c91ff',
          500: '#3b6ef6',
          600: '#2550eb',
          700: '#1d3dd8',
          800: '#1e34af',
          900: '#1e318a',
          950: '#161f54',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
