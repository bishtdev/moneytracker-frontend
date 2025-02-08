/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        jersey: ["Jersey 15", "sans-serif"],
        londrina: ["Londrina Shadow", "cursive"],
        monoton: ["Monoton", "cursive"],
        playwrite:["Playwrite IN"],
        roboto: ["Roboto"]
      },
    },
  },
  plugins: [],
};
