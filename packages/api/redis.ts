import { createClient } from "redis"
import env from "./env"

export const redis = createClient({
  url: env.redisUrl,
})
