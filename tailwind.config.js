/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      xxl: { max: "1280px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "912px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "820px" },
      // => @media (max-width: 820px) { ... }

      md: { max: "414px" },
      // => @media (max-width: 414px) { ... }

      sm: { max: "375px" },
      // => @media (max-width: 375px) { ... }
    },
  },
  plugins: [],
};
