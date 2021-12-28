module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['children'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-children')],
};
