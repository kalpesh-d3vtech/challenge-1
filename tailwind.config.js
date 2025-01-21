/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                orange: "#f97316",
                blue: "#2563eb",
            },
            animation: {
                spin: "spin 1.5s linear infinite",
            },
            backgroundImage: {
                gradient:
                    "conic-gradient(at center, #f97316, #2563eb, #f97316)",
            },
            fontFamily: {
                avenir: ["Avenir", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
                inter: ["Inter", "sans-serif"],
                sfpro: ['SF Pro', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
