"use server"

import { cookies } from "next/headers"

import { languageSchemaFallback } from "@/schemas"
import config from "@/utils/config"

const getServerLanguage = () => {
  const cookiesStore = cookies()
  const cookieLanguage = cookiesStore.get(config.cookieLanguage)

  return languageSchemaFallback.parse(cookieLanguage?.value)
}

export default getServerLanguage
