import { createGlobPatternsForDependencies } from "@nx/react/tailwind";
import { join } from "path";
import type { Config } from "tailwindcss";
import { colors } from "./design-token";

const config: Config = {
  content: [
    join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors,
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
