import { z } from "zod"

import config from "@/utils/config"

export const languageSchema = z.enum(config.languageKeys)
export const languageSchemaFallback = languageSchema.catch(config.fallbackLng)
