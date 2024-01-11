import type { Config } from "drizzle-kit";

export default {
  schema: "./libs/api/models/src/drizzle/schema/*",
  out: "./libs/api/models/src/drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
