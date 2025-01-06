/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Medieval: ["MedievalSharp", "cursive"],
        Railway: ["Raleway", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        Boicot: "Boicot",
        Disamber: "Disamber",
      },
      colors: {
        PaleNimbus: "#ECF4E5",
        RichBlack: "#0D0D0D",
      },
    },
  },
  plugins: [],
};
