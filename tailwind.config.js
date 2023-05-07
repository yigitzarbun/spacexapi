/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      xxl: { max: "1920" },
      // => @media (max-width: 1920px) { ... }
      xl: { max: "1280" },
      // => @media (max-width: 1280px) { ... }
      lg: { max: "850" },
      // => @media (max-width: 850px) { ... }
      md: { max: "540" },
      // => @media (max-width: 540px) { ... }
      sm: { max: "414" },
      // => @media (max-width: 414px) { ... }
      xs: { max: "393" },
      // => @media (max-width: 393px) { ... }
    },
  },
  plugins: [],
};
