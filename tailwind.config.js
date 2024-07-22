/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'black': '#000000',
      'white': '#ffffff',
      'purp-dark': '#605399',
      'purp': '#ada1e6',
      'purp-light': '#e4def9',
      'mag-light': '#ebc1ee',
      'mag': '#d562be',
      'warn-red': '#b80600'

    },
    extend: {},
  },
  plugins: [],
}

