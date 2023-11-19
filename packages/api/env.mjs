import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    IMAGES_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    IMAGES_URL: process.env.IMAGES_URL,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
})
