/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
      },
      fontSize: {
        base: '14px',
      },
      fontFamily: {
        'LINESeedKR-Rg': ['LINESeedKR-Rg'],
        'LINESeedKR-Bd': ['LINESeedKR-Bd'],
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg,#9070c0 0%, #8fa5e5 100%)',
        checkbox_off: "url('assets/checkbox_off.svg')",
        checkbox_on: "url('assets/checkbox_on.svg')",
      },
      variants: {
        fill: ['hover', 'focus'],
      },
    },
  },
  plugins: [],
};
