module.exports = {
  content: [
    "/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: {
          max: '764px',
        },
        mobile: {
          max: '992px',
        },
        sm: {
          max: '365px',
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        main: {
          light: '#E0E0E0',
          DEFAULT: '#1BA3CE',
          dark: '#0354AE',
          font: '#3B3B3B',
        },
        facebook: {
          DEFAULT: '#3A589B'
        },
        gray: {
          DEFAULT: '#F9F9F9',
          back: '#F9F9FB',
          thead: '#F7F7F7',
          light: '#E6E6E6',
          table: '#EAEAEA',
          description: '#A2A9B2',
          input: '#BDBDBD',
          separator: '#D7D7D7',
          dark: '#555555',
          item: '#6D6D6D',
          'data-head': '#84818A',
          data: '#2E2C34'
        },

      },
      fontSize: {
        md: '15px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
