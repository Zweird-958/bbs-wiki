import type common from "@/locales/fr/common.json"
import type { AvailableLocales } from "@/types/Locale"

type Key = "common"

const getLocales = async <T>(key: Key, locale: AvailableLocales) =>
  (await import(`@/locales/${locale}/${key}`)) as Promise<T>

const getTranslations = async (locale: AvailableLocales) => {
  return {
    common: await getLocales<typeof common>("common", locale),
  }
}

export default getTranslations
