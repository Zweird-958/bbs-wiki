"use server"

import { cookies } from "next/headers"

import type { AvailableLocales } from "@/types/Locale"
import config from "@/utils/config"

const changeLanguage = (language: AvailableLocales) => {
  const cookiesStore = cookies()
  cookiesStore.set(config.cookieLanguage, language)
}

export default changeLanguage
