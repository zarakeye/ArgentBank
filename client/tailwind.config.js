/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundPosition: {
      'background-position': '0 -50px',
    },
    backgroundPosition_large: {
      'background-position': '0% 33%',
    },
    extend: {
      screens: {
        'medium': '720px',
        'large': '920px',
      },
      borderStyle: {
        'r-inset': 'inset',
        'l-inset': 'inset',
        'b-inset': 'inset',
        't-inset': 'inset',
      },
    },
  },
  plugins: [],
}

