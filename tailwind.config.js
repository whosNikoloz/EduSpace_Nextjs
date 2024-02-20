import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "pattern-dark": "url('/tortoise-shell-dark.png')",
        "pattern-white": "url('/tortoise-shell.png')",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        scroller: {
          "0%": {
            bottom: "20px",
          },
          "5%": {
            top: "4px",
          },
          "32%": {
            bottom: "4px",
          },
          "66%": {
            top: "20px",
            bottom: "4px",
          },
          "100%": {
            top: "4px",
            bottom: "20px",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
