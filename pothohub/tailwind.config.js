/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports =  withMT({
  content: [
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
