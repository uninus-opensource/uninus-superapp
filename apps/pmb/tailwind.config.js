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
      colors: {
        primary: {
          green: '#009647',
          yellow: '#F8BF02',
        },
        secondary: {
          green: {
            1: '#3EA136',
            2: '#7CAB25',
            3: '#BAB514',
            4: '#175349',
          },
        },
        grayscale: {
          0: '#000000',
          10: '#141414',
          20: '#292929',
          30: '#3D3D3D',
          40: '#525252',
          50: '#666666',
          60: '#7A7A7A',
          70: '#9E9E9E',
          80: '#B3B3B3',
          90: '#C7C7C7',
          100: '#FFFFFF',
        },
        green: {
          930: '#1c532a',
        },
      },
    },
  },
  plugins: [],
};
