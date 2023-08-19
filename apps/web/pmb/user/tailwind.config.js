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
        full: "0px 3px 10px rgb(0,0,0,0.2)",
      },
      width: {
        18: "72px",
        26: "105px",
        "100%": "100vw",
        "95%": "95vw",
        "90%": "90vw",
        "85%": "85vw",
        "80%": "80vw",
        "75%": "75vw",
        "70%": "70vw",
        "65%": "65vw",
        "60%": "60vw",
        "55%": "55vw",
        "50%": "50vw",
        "45%": "45vw",
        "40%": "40vw",
        "35%": "35vw",
        "30%": "30vw",
        "25%": "25vw",
        "20%": "20vw",
        "15%": "15vw",
        "10%": "10vw",
        "5%": "5vw",
      },
      height: {
        18: "72px",
        26: "105px",
        "navbar-mobile": "160px",
        navbarlg: "80px",
        footerHeight: "360px",
        bannerLg: "520px",
      },
      fontWeight: {
        extramedium: "550",
      },
    },
    colors: {
      primary: {
        green: "#009647",
        yellow: "#F8BF02",
        white: "#FFFFFF",
        orange: "#F78100",
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
      },
      grayscale: {
        10: "#141414",
        9: "#292929",
        8: "#3D3D3D",
        7: "#525252",
        6: "#666666",
        5: "#7A7A7A",
        4: "#9E9E9E",
        3: "#B3B3B3",
        2: "#C7C7C7",
        1: "#FAFCFF",
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
        3: "#EAC0C4",
        4: "#ff5252",
        5: "#ff0000",
        6: "#a70000",
        7: "#BB2D3B",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
