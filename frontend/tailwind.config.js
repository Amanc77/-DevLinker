/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F1724',
          card: '#121826',
          border: 'rgba(255,255,255,0.04)',
        },
        primary: '#7C5CFF',
        secondary: '#00C29A',
        muted: {
          dark: '#AAB2C1',
          light: '#4B5563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

