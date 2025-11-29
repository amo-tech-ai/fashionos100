
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./*.{js,ts,jsx,tsx}", // Catches files in root
    "./**/*.{js,ts,jsx,tsx}" // Catch-all for nested structures
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        fashion: {
          black: '#0a0a0a',
          purple: '#c084fc',
          purpleDark: '#a855f7',
          cream: '#fbf8f5',
          orange: '#fbbf24',
          blue: '#22d3ee'
        }
      },
      container: {
        center: true,
        padding: '1rem',
      }
    },
  },
  plugins: [],
}
