/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'footer-card-image': "url('../assets/images/footer-card-image.png')",
      },
      fontFamily: {
        dmSans: ['DMSans', 'sans-serif']
      },
      colors: {
        white: '#FFF',
        black: {
          base: '#000',
        },
        // purple: {
        //   base: '#5E257D',
        //   light: '#5E257D50',
        //   highlight: '#540c7a'
        // },
        // gold: {
        //   base: '#D6A156',
        //   highlight: '#AF7E38',
        //   light: '#D6A15650'
        // },
        // grey: {
        //   base: '#ADADAD',
        //   base88: '#ADADAD88',
        //   light: '#EAEAEA',
        //   border: '#C6C6C8'
        // },
        // error: {
        //   base: '#E33B45'
        // },
        // green: {
        //   lime: '#8BC043'
        // }
      }
    },
    colors: {

    }
  },
  plugins: [],
}
