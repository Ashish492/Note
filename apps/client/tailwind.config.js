/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
    safelist: [
      'animate-[fade-in_1s_ease-in-out]',
      'animate-[fade-in-down_1s_ease-in-out]',
    ],
  },
  darkMode: 'class',
  plugins: [
    require('tw-elements/dist/plugin.cjs'),
    require('@tailwindcss/typography'),
  ],
}
