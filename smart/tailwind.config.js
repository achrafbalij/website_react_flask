/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        100: "#b7c9d3",
        200: "#6399ae",
        300: "#0085ad",
        400: "#005587",
        500: "#00205b",
      },

      black: "#000000",
      white: "#FFFFFF",
      silver: "#C0C0C0",
      lighsilver: "#F1F1FA",
      red: "#FF0000",
      green: "#008000",
      blue: "#0000FF",
      yellow: "#FFFF00",
      cyan: "#00FFFF",
      magenta: "#FF00FF",
      orange: "#FFA500",
      purple: "#800080",
      pink: "#FFC0CB",
    },
  },
  plugins: [],
};
