const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      boxShadow: {
        inset: "0px 2px 6px 0px rgba(0, 0, 0, 0.25) inset",
        card: "0px 4px 6px -1px #e2e8f0",
      },
      fontWeight: {
        extramedium: "550",
      },
      fontFamily: {
        montserrat: `'Montserrat', sans-serif`,
      },
    },
    colors: {
      cover: {
        primary: {
          green: "rgba(0, 150, 71, 0.7)",
        },
      },
      primary: {
        green: "#009647",
        yellow: {
          300: "#FAD455",
          500: "#F8BF02",
        },
        white: "#FFFFFF",
        black: "#000000",
      },
      secondary: {
        green: {
          1: "#3EA136",
          2: "#7CAB25",
          3: "#BAB514",
          4: "#175349",
          5: "#113C35",
          6: "#162000",
        },
        sky: {
          1: "#1678682E",
          2: "#B9DEDA",
        },
        500: "#175349",
      },
      grayscale: {
        900: "#3D3D3D",
        50: "#FAFAFA",
        10: "#141414",
        9: "#292929",
        8: "#3D3D3D",
        7: "#525252",
        6: "#666666",
        5: "#7A7A7A",
        4: "#9E9E9E",
        3: "#B3B3B3",
        2: "#C7C7C7",
        1: "#FFFFFF",
      },
      disable: {
        state: "#BDBDBD",
      },
      slate: {
        1: "rgb(248 250 252)",
        2: "rgb(241 245 249)",
        3: "rgb(226 232 240)",
        4: "rgb(203 213 225)",
        5: "rgb(148 163 184)",
      },
      red: {
        1: "#ffbaba",
        2: "#ff7b7b",
        3: "#ff5252",
        4: "#ff0000",
        5: "#a70000",
      },
      error: {
        600: "#D34B21",
        100: "#FBE8D9",
      },
      green: {
        50: "#E6F5ED",
      },
      yellow: {
        200: "#FCE28B",
        300: "#FAD455",
      },
      success: {
        950: "#02311D",
        900: "#0F5838",
        400: "#3EEA99",
        200: "#B6FCD9",
        50: "#EFFEF6",
      },
      orange: {
        1: "#FFE9C8",
        2: "#FFA41B",
      },
      blue: "#78BDFD",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
