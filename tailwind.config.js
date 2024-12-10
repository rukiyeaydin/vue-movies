/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#171717',
      },
      screens:{
        'xxs': '400px',
      },
      boxShadow: {
        'shadowSidebar': ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }
    },
  },
  plugins: [],
}