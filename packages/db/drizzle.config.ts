import type { Config } from "drizzle-kit"
import env from "./env"

export default {
  schema: "./schema",
  driver: "pg",
  dbCredentials: {
    connectionString: env.dbUrl,
  },
  out: "./migrations",
} satisfies Config
