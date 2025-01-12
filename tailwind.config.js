/** @type {import('tailwindcss').Config} */
const CONFIG = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
    darkMode: ["selector", '[data-theme="dark"]'],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
    corePlugins: {
        preflight: false,
    },
};

export default CONFIG;
