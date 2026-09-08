/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { green: "#9fff00", dark: "#0a0a0a", gray: "#8e8e8e", light: "#f1f1f1" },
        wabot: { green: "#00A884", dark: "#111B21" },
        base: "#EDEEF5",
        ink: "#1a1a1a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      keyframes: {
        floating: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        holoSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        holoSheen: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floating: "floating 6s ease-in-out infinite",
        "floating-delayed": "floating 6s ease-in-out -3s infinite",
        holoSpin: "holoSpin 8s linear infinite",
        holoSheen: "holoSheen 4s linear infinite",
      },
    },
  },
  plugins: [],
};
