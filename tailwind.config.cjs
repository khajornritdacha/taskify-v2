/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green-traditional': '#103900ff',
        'laurel-green': '#92ad94ff',
        'xanadu': '#748b75ff',
        'old-burgundy': '#503d42ff',
        'old-mauve': '#4c2b36ff',
      },
      fontFamily: {
        'karla': ['Karla', 'sans-serif'],
      }
    },
  },
  plugins: [],
}