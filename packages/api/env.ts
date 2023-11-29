import { z } from "zod"

const validationSchema = z.object({
  imagesUrl: z.string(),
})

const env = validationSchema.parse({
  imagesUrl: process.env.IMAGES_URL,
})

export default env
