import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import env from "./env"
import * as character from "./schema/character"
import * as dictionary from "./schema/dictionary"

export const schema = { ...character, ...dictionary }
export * from "drizzle-orm"
export { pgTable as tableCreator } from "./schema/_table"

neonConfig.fetchConnectionCache = true
const sql = neon(env.dbUrl)
export const db = drizzle(sql, { schema })
