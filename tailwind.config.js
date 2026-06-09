/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body:    ["DM Sans", "sans-serif"],
      },
      colors: {
        bg:       "#09090f",
        bg2:      "#0e0e18",
        bg3:      "#13131f",
        surface:  "#18182a",
        surface2: "#1e1e30",
        border:   "#252538",
        border2:  "#2e2e48",
        text:     "#e2e2f0",
        text2:    "#9090b0",
        text3:    "#505070",
        accent:   "#7c6af7",
        accent2:  "#4fd1c5",
        accent3:  "#f6ad55",
        live:     "#4ade80",
        testing:  "#fb923c",
      },
    },
  },
  plugins: [],
};