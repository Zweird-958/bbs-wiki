import config from "@bbs/api/config"
import { z } from "zod"

export const pageValidator = z.number().int().positive().default(1).catch(1)
export const pageLimitValidator = z
  .number()
  .max(config.pageLimitMax)
  .optional()
  .default(config.pageLimit)
  .catch(config.pageLimit)

export * from "zod"
