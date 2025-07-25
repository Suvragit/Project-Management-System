module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'md': '0 4px 6px -1px var(--color-primary-100)',
        'lg': '0 10px 15px -3px var(--color-primary-100)'
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'shadow': 'box-shadow'
      }
    },
  },
  plugins: [],
}