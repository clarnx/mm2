const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // Ensure these match with .storybook/preview.js
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      fontFamily: {
        Lato: ['Lato', 'Arial', 'sans-serif'],
      },
      colors: {
        'app-yellow': '#FFDA36',
        'app-black': '#040404',
        'app-red': '#DF2935',
        'app-blue': '#5465FF',
        'app-skyblue': '#ECF8F8',
      },
    },
  },
  plugins: [],
});
