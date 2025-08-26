/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        poe: {
          gold: '#D4AF37',
          goldDark: '#B8860B',
          brown: '#2D1B0E',
          dark: '#0A0A0A',
          darker: '#050505',
          light: '#E6D8C5',
          red: '#8B0000',
          blue: '#191970',
          orange: '#FF6B35',
          purple: '#4B0082',
        }
      },
      fontFamily: {
        korean: ['Noto Sans KR', 'sans-serif'],
        english: ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}