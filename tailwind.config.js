import { withTV } from "tailwind-variants/transformer";

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
    content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
    corePlugins: {
        preflight: false,
    },
});
