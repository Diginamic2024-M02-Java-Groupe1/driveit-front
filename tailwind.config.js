/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(174, 27%, 53%)',
        secondary: 'hsl(171, 36%, 71%)',
        accent: 'hsl(170, 46%, 65%)',
        text: 'hsl(180, 9%, 7%)',
        background: 'hsl(180, 14%, 96%)',
        driveGreen: '#47C29F',
      },
    },
  },
  plugins: [],
}

