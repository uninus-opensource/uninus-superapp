import { createGlobPatternsForDependencies } from "@nx/react/tailwind";
import { join } from "path";
import { colors } from "./design-token";
import type { Config } from "tailwindcss";

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
