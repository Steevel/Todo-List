/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    colors: {
      "bgcolor": "#050517",
      "primary": "#3F60C5",
      "secondary": "#F6F7FD",
      "grayshade": "#808080",
      "white": "#FFFFFF",
      "headingcolor": "#1B1212",
      "btncolor": "#FAF9F6",
      "btntextcolor": "#E31837",
    },
    fontFamily: {
      display: ['Roboto', "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
