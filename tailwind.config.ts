/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx,svelte}",
	],
	theme: {
		extend: {

			fontFamily: {
				'montserrat': 'Montserrat, sans-serif',
				'proxima': 'proxima-nova", sans-serif',
				'roboto': 'Roboto, sans-serif',
				'open-sans': 'Open Sans, sans-serif',
				'raleway': 'Raleway, sans-serif',
				'cabin': 'Cabin, sans-serif',
				'poppins': "Poppins, sans-serif"
			},
			height: {
				'405': '405px',
				'screenPlus': '115vh',
				'88': '88%',
			},
			flexGrow: {
				'0.05': '0.05',
				'10': '10',
			},
			width: {
				'42p': '42%',
				'81': '81%',
				'110': '26rem',
			},
			inset: {
				'10': '10%',
				'18': '18%',
				'19': '19%',
				'30': '30%',
				'45': '45%',
			},
			transitionDuration: {
				'0': '0ms',
				'10': '10ms',
				'2000': '2000ms',
			},
			minHeight: {
				'280': '280px',
				'300': '300px',
			},
			minWidth: {
				'33': '33%',
				'150': '150px',
				'380': '380px',
				'500': '500px'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'flex': 'flex'
			},
			zIndex: {
				"max": "9999999999",
			},
			flex: {
				"zero": "0",
				"one": "1"
			}
		}
	},
	plugins: [],
}
import './index.css'
