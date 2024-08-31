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
      'warn-red': '#b80600',
      'ok-green': '#138808',
      'blue' : '#104abe'
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' }
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' }
        },
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' }
        },
        fadeInRight: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        fadeOutUp: {
          '0%': { opacity: 1, transform: 'translateY(0px)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' }
        },
        fadeOutDown: {
          '0%': { opacity: 1, transform: 'translateY(0px)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' }
        },
        fadeOutLeft: {
          '0%': { opacity: 1, transform: 'translateX(0px)' },
          '100%': { opacity: 0, transform: 'translateX(-20px)' }
        },
        fadeOutRight: {
          '0%': { opacity: 1, transform: 'translateX(0px)' },
          '100%': { opacity: 0, transform: 'translateX(20px)' }
        },
        
      },
      animation: {
        fadeIn: 'fadeIn 0.2s',
        fadeInUp: 'fadeInUp 0.2s',
        fadeInDown: 'fadeInDown 0.2s',
        fadeInLeft: 'fadeInLeft 0.2s',
        fadeInRight: 'fadeInRight 0.2s',
        fadeOut: 'fadeOut 0.2s',
        fadeOutUp: 'fadeOutUp 0.2s',
        fadeOutDown: 'fadeOutDown 0.2s',
        fadeOutLeft: 'fadeOutLeft 0.2s',
        fadeOutRight: 'fadeOutRight 0.2s',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

