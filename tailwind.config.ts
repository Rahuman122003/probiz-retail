import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["'SF Pro Display'", "Inter", "sans-serif"],
                quicksand: ["Quicksand", "Inter", "sans-serif"],
            },
            colors: {
                ink: {
                    50: "#f7f7f8",
                    100: "#ececee",
                    200: "#d1d1d6",
                    300: "#b5b5bd",
                    400: "#86868b",
                    500: "#6e6e73",
                    600: "#3d3d42",
                    700: "#2c2c30",
                    800: "#1d1d1f",
                    900: "#0a0a0b",
                    950: "#050506",
                },
                accent: {
                    DEFAULT: "#0066ff",
                    glow: "#3b82f6",
                },
            },
            letterSpacing: {
                tightest: "-0.045em",
                ultra: "-0.06em",
            },
            animation: {
                "fade-in": "fadeIn 1s ease forwards",
                "shimmer": "shimmer 3s linear infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
                shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
                float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
            },
        },
    },
    plugins: [],
};
export default config;