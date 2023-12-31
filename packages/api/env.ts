import { imagesUrlValidator } from "@bbs/validators"
import { z } from "zod"

const validationSchema = z.object({
  imagesUrl: imagesUrlValidator,
  redisUrl: z.string(),
})

const env = validationSchema.parse({
  imagesUrl: process.env.NEXT_PUBLIC_IMAGES_URL,
  redisUrl: process.env.REDIS_URL,
})

export default env
