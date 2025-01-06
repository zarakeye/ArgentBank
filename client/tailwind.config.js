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
    srOnly: {
      'border': '0 !important',
      'clip': 'rect(1px, 1px, 1px, 1px) !important',
      '-webkit-clip-path': 'inset(50%) !important',
      'clip-path': 'inset(50%) !important',
      'height': '1px !important',
      'margin': '-1px !important',
      'overflow': 'hidden !important',
      'padding': '0 !important',
      'position': 'absolute !important',
      'width': '1px !important',
      'white-space': 'nowrap !important',
    },
    extend: {
      screens: {
        'medium': '720px',
        'large': '920px',
      }
    },
  },
  plugins: [],
}

