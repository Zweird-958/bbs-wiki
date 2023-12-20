import { imagesUrlValidator } from "@bbs/validators"
import { z } from "zod"

const validationSchema = z.object({
  imagesUrl: imagesUrlValidator,
  vercelUrl: z.string().optional(),
  port: z.string().default("3000"),
})

const env = validationSchema.parse({
  imagesUrl: process.env.NEXT_PUBLIC_IMAGES_URL,
  vercelUrl: process.env.VERCEL_URL,
  port: process.env.PORT,
})

export default env
