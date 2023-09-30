/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#8599b6',
        'custom-black': '#141d2c',
      },
    },
  },
  plugins: [],
}

