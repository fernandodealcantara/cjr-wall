/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      NAV: '#6A1612',
      NAVCard: '#851610',
      NUT: '#1D3557',
      NUTCard: '#457B9D',
      NOE: '#0B5F2F',
      NOECard: '#0D9347',
      NIP: '#6C2144',
      NIPCard: '#AE326C',
      NDP: '#39484F',
      NDPCard: '#607D8B',
    },
    extend: {
      backgroundImage: {
        tijNAV:
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #DC4A3C 0%, rgba(220, 74, 60, 0) 100%)",
        tijNUT:
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #119CDC 0%, rgba(17, 156, 220, 0) 100%)",
        tijNOE:
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #2EC26E 0%, rgba(46, 194, 110, 0) 100%)",
        tijNIP:
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #CC4784 0%, rgba(204, 71, 132, 0) 100%)",
        tijNDP:
          "url('/src/assets/grid.svg'), linear-gradient(180deg, #607D8B 0%, rgba(96, 125, 139, 0) 100%)",
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
