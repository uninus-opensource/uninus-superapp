const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        body :  ['montserrat']
      },
    },
    colors: {
      primary: {
        50: "#eef8ff",
        100: "#d9eeff",
        200: "#bce2ff",
        300: "#8ed1ff",
        400: "#59b6ff",
        500: "#429eff",
        600: "#1b76f5",
        700: "#1460e1",
        800: "#174db6",
        900: "#19448f",
        950: "#142a57",
      },
      grayscale: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#7c7c7c",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#262626",
      },  
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
