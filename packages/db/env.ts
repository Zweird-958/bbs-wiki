import { z } from "zod"

const validationSchema = z.object({
  dbUrl: z.string(),
})

const env = validationSchema.parse({
  dbUrl: process.env.DATABASE_URL,
})

export default env
