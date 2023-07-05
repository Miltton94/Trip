/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#590bd8',
        primaryLight: '#ddd5ea',
        primaryDark: '#312a4f',
      },
      textColor: {
        dark: '#717171',
      },
    },
  },
  plugins: [],
}
