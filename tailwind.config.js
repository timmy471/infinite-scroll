/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      maxWidth: "",
      screens: {
        sm: "1200px",
      },
    },
    extend: {},
  },
  plugins: [],
};
