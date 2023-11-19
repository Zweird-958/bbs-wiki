import { z } from "zod"

export const pageValidator = z.number().int().positive().optional().catch(1)
