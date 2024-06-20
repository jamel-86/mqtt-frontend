import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%, 100%': {
            transform: 'scale(0.95)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'scale(1.05)',
            'animation-timing-function': 'cubic-bezier(0.1, 1, 0.8, 1)',
          },
        },
        bounceOut: {
          '0%, 100%': {
            transform: 'scale(1)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'scale(0.95)',
            'animation-timing-function': 'cubic-bezier(0.1, 1, 0.8, 1)',
          },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.3s forwards',
        bounceOut: 'bounceOut 0.3s forwards',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
