import { imagesUrlValidator } from "@bbs/validators"
import { z } from "zod"

const validationSchema = z.object({
  imagesUrl: imagesUrlValidator,
})

const env = validationSchema.parse({
  imagesUrl: process.env.NEXT_PUBLIC_IMAGES_URL,
})

export default env
