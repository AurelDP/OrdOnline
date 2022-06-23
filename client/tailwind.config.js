/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'ord-dark-green': '#073B3A',
      'ord-green': {
        100: '#00A99D',
        200: '#41C2B2',
        300: '#3DC7B9',
        400: '#4BCFC1',
        500: '#AEE4E3',
        600: '#E4F8F5',
      },
      'ord-dark-blue': '#2D3047',
      'ord-red': '#DE5456',
      'white': colors.white,
      'light-gray': colors.gray[300],
    }
  },
  plugins: [],
}
