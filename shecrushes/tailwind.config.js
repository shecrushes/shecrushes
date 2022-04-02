const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['dark'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      trueGray: colors.zinc,
      gray: colors.gray,
      white: colors.white,
      rose: colors.red,
      pink: colors.pink,
      yellow: colors.yellow,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      black: colors.black,
      blue: colors.blue,
      orange: colors.orange,
      violet: colors.violet,
      cyan: colors.cyan,
      transparent: 'transparent',
    },
  },
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-overlay': {
          background:
            'linear-gradient(var(--overlay-angle, 0deg), var(--overlay-colors)), var(--overlay-image)',
          'background-position': 'center',
          'background-size': 'cover',
        },
      });
    }),
    plugin(function ({ addVariant }) {
      addVariant('even', '&:nth-child(even)');
      addVariant('odd', '&:nth-child(odd)');
      addVariant('hocus', ['&:hover', '&:focus']);
    }),
  ],
};
