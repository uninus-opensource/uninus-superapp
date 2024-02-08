const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const { colors } = require("@uninus/web/utilities");

module.exports = {
  content: [
    join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors,
  },
  plugins: [require("@tailwindcss/forms")],
};
