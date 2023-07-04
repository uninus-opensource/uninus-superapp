const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      boxShadow: {
        inset: '0px 2px 6px 0px rgba(0, 0, 0, 0.25) inset',
      },
      height: {
        navbarlg: '120px',
      },
      fontFamily: {
        bebasNeue: ['Bebas Neue', 'sans-serif'],
      },
    },
    colors: {
      primary: {
        green: '#009647',
        yellow: '#F8BF02',
        white: '#FFFFFF',
      },
      secondary: {
        green: {
          1: '#3EA136',
          2: '#7CAB25',
          3: '#BAB514',
          4: '#175349',
          5: '#113C35',
        },
        sky: {
          1: '#1678682E',
          2: '#B9DEDA',
        },
      },
      grayscale: {
        10: '#141414',
        9: '#292929',
        8: '#3D3D3D',
        7: '#525252',
        6: '#666666',
        5: '#7A7A7A',
        4: '#9E9E9E',
        3: '#B3B3B3',
        2: '#C7C7C7',
        1: '#FFFFFF',
      },
      disable: {
        state: '#BDBDBD',
      },
    },
  },
  plugins: [],
};
