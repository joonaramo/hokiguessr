module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      display: ['children'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-children')],
};
