/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				// 'footer-card-image': "url('../assets/images/footer-card-image.png')",
			},
			fontFamily: {
				dmSans: ['DMSans', 'sans-serif'],
			},
			colors: {
				white: '#FFF',
				black: {
					base: '#000',
				},
				blue: {
					base: '#33384F',
				},
				red: {
					base: '#AC172C',
					highlight: '#8f0d1f',
				},
			},
		},
		colors: {},
	},
	plugins: [],
}
