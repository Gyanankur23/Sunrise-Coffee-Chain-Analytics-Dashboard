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
          50: '#faf7f2',
          100: '#f5efe4',
          200: '#e8dcc9',
          300: '#d4c4a8',
          400: '#bfa982',
          500: '#a68a5a',
          600: '#8c6d44',
          700: '#735234',
          800: '#5e412b',
          900: '#4d3523',
          950: '#2a1a10',
        },
        cream: {
          50: '#fffcf5',
          100: '#fef9e6',
          200: '#fdf2c0',
          300: '#fce993',
          400: '#fadd66',
          500: '#f9cf3d',
          600: '#e2b629',
          700: '#b68e20',
          800: '#8a6f1a',
          900: '#6e5917',
          950: '#412e0c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

