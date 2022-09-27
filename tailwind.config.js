/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "haze-green": "#00CB75",
        "magenta": "#FF206E",
        "gold-brown":"#FFB129",
        "tifanny-blue": "#17BEBB",
        "raisin-black": "#2E282A",
        "green-ryb": "#76B041",
        "ghost-white": "#F8F9FD"
      }
    },
  },
  plugins: [],
}