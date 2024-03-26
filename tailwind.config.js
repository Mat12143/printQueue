/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				accent: '#24A543',
				primary: '#FFFFFF',
				button: '#056c2b',
				disabled: '#EBEBE4'
			}
		}
	},
	plugins: []
};
