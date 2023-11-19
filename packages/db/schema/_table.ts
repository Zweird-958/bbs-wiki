import { pgTableCreator, text } from "drizzle-orm/pg-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => name)
export const dictionarySchema = (tableName: string) =>
  pgTable(tableName, {
    dictKey: text("dict_key").primaryKey(),
    contentJa: text("content_ja"),
    contentEn: text("content_en"),
    contentFr: text("content_fr"),
    contentTh: text("content_th"),
    contentKo: text("content_ko"),
    contentSc: text("content_sc"),
    contentTc: text("content_tc"),
  })
