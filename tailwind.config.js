/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f3',
          100: '#f7efe4',
          200: '#ecdcc5',
          300: '#dec4a0',
          400: '#d0a87a',
          500: '#c48b5c',
          600: '#a86d42',
          700: '#8c5530',
          800: '#724325',
          900: '#5c361e',
          950: '#3d1f0f',
        },
        sunrise: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        latte: {
          50: '#faf8f5',
          100: '#f5efe7',
          200: '#ebe0cd',
          300: '#e0d0b3',
          400: '#d5c099',
          500: '#c9b07f',
          600: '#a8956a',
          700: '#877a55',
          800: '#665f40',
          900: '#45442b',
          950: '#232216',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'coffee-light': '#fdf8f3',
        'coffee-dark': '#1a1512',
      },
    },
  },
  plugins: [],
}

