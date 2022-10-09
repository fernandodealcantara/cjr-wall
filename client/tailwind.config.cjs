/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
