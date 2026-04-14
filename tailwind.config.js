/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          from: '#8B5CF6', // violet
          to: '#3B82F6', // blue
        },
        secondary: '#FCD34D', // yellow
        background: '#FEFEFE', // white cassé
        success: '#10B981', // green
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}