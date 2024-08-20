/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'text': 'hsl(var(--text))',
        'background': 'hsl(var(--background))',
        'primary': 'hsl(var(--primary))',
        'secondary': 'hsl(var(--secondary))',
        'accent': 'hsl(var(--accent))',
        driveGreen: '#47C29F',
      },
    },
  },
  plugins: [],
}

