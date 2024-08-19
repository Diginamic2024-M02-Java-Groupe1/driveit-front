/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'text': 'hsl(var(--text))',
      'background': 'hsl(var(--background))',
      'primary': 'hsl(var(--primary))',
      'secondary': 'hsl(var(--secondary))',
      'accent': 'hsl(var(--accent))',
    },
    extend: {},
  },
  plugins: [],
}

