/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      sans: ['Mulish', 'sans-serif'],
      mono: ['Rokkitt', 'monospace']
    },
    extend: {},
  },
  plugins: [],
}

