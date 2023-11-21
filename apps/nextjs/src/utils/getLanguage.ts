import { getCookie } from "cookies-next"

import { languageSchemaFallback } from "@/schemas"
import config from "@/utils/config"

const getLanguage = () => {
  const language = getCookie(config.cookieLanguage)

  return languageSchemaFallback.parse(language)
}

export default getLanguage
