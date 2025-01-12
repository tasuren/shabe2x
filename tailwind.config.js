/** @type {import('tailwindcss').Config} */
const CONFIG = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
    corePlugins: {
        preflight: false,
    },
};

export default CONFIG;
