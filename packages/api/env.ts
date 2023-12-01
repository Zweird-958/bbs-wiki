import { z } from "zod"

const validationSchema = z.object({
  imagesUrl: z.string(),
  redisUrl: z.string(),
})

const env = validationSchema.parse({
  imagesUrl: process.env.IMAGES_URL,
  redisUrl: process.env.REDIS_URL,
})

export default env
