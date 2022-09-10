/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'tijNAV':
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #DC4A3C 0%, rgba(220, 74, 60, 0) 100%)",
        'tijNUT':
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #119CDC 0%, rgba(17, 156, 220, 0) 100%)",
        'tijNOE':
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #2EC26E 0%, rgba(46, 194, 110, 0) 100%)",
        'tijNIP':
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #CC4784 0%, rgba(204, 71, 132, 0) 100%)",
        'tijNDP':
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #607D8B 0%, rgba(96, 125, 139, 0) 100%)",
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
