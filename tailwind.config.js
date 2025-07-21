module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CADCFC',
          100: '#CADCFC',
          200: '#00246B',
          600: '#00246B'
        },
        accent: {
          DEFAULT: '#00246B',
          500: '#2980B9'
        },
        gray: {
          100: '#CADCFC',
          200: '#EEEEEE',
          700: '#00246B',
          800: '#00246B'
        }
      },
      boxShadow: {
        'md': '0 4px 6px -1px #CADCFC',
        'lg': '0 10px 15px -3px #CADCFC'
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'shadow': 'box-shadow'
      }
    },
  },
  plugins: [],
}