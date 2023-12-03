import type character from "@/locales/fr/character.json"
import type common from "@/locales/fr/common.json"
import type { AvailableLocales } from "@/types/Locale"

type Key = "common" | "character"

const getLocales = async <T>(key: Key, locale: AvailableLocales) =>
  (await import(`@/locales/${locale}/${key}`)) as Promise<T>

const getTranslations = async (locale: AvailableLocales) => {
  return {
    common: await getLocales<typeof common>("common", locale),
    character: await getLocales<typeof character>("character", locale),
  }
}

export default getTranslations
