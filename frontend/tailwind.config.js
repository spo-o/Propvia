/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#003D3C',
          50: '#E6EDED',
          100: '#CCDBDB',
          200: '#99B7B7',
          300: '#669393',
          400: '#336F6F',
          500: '#003D3C',
          600: '#003130',
          700: '#002524',
          800: '#001918',
          900: '#000C0C',
        },
        accent: {
          DEFAULT: '#F6C447',
          light: '#FFD54F',
          dark: '#D4A129',
        }
      }
    },
  },
  plugins: [],
};