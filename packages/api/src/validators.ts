import { z } from "zod"

import config from "../config"

export const pageValidator = z.number().int().positive().catch(1)
export const pageLimitValidator = z
  .number()
  .max(config.pageLimitMax)
  .catch(config.pageLimit)
