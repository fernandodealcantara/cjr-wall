/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        tijNAV: "url('/src/assets/nav-grid.svg')",
        tijNUT: "url('/src/assets/nut-grid.svg')",
        tijNOE: "url('/src/assets/noe-grid.svg')",
        tijNIP: "url('/src/assets/nip-grid.svg')",
        tijNDP: "url('/src/assets/ndp-grid.svg')",
        gridTij: "url('/src/assets/grid.svg')",
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        'ratio-grid': '61 / 22',
      },
    },
  },
  plugins: [],
}
