/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	corePlugins: {
		preflight: false
	},
	theme: {
		colors: {
			"gray-dark": "#27272a",
			"gray-light": "#ffffff",
			link: "#539af8",
			"link-visited": "#9268de"
		},
		fontFamily: {
			sans: ["Graphik", "sans-serif"],
			serif: ["Merriweather", "serif"]
		},
		extend: {
			typography: ({ theme }) => ({
				shabe2x: {
					css: {
						"--tw-prose-headings": theme("colors.zinc[800]"),
						"--tw-prose-invert-headings": theme("colors.zinc[300]"),
						"--tw-prose-links": theme("colors.link"),
						"--tw-prose-invert-links": theme("colors.link")
					}
				}
			})
		}
	},
	darkMode: ["selector", '[data-theme="dark"]'],
	plugins: [require("@tailwindcss/typography")]
};
