import type { Config } from "drizzle-kit";

export default {
  schema: "./libs/api/models/src/drizzle/schema.ts",
  out: "./libs/api/models/src/drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
