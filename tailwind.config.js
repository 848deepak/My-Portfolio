/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
        secondary: "#6c757d",
        dark: "#1a202c",
        light: "#f8f9fa",
      },
    },
  },
  plugins: [],
} 