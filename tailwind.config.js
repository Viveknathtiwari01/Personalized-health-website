/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a259e6',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #a259e6 0%, #a259e6 100%)',
        'gradient-primary-soft': 'linear-gradient(90deg, #a259e6 0%, #c084fc 100%)',
      },
    },
  },
  plugins: [],
}
