/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-navy-blue': '#2f74c0ff',
        'arylide-yellow': '#e9d758ff',
        'orange-red-crayola': '#ff5e5bff',
        'ghost-white': '#f4f4f9ff',
        'maximum-blue-green': '#32C3CD',
      },
      fontFamily: {
        'neucha': ['Neucha', 'cursive'],
      }
    },
  },
  plugins: [],
}