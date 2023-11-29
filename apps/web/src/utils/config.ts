import type { AvailableLocales, Flag } from "@/types/Locale"

interface Language {
  label: string
  key: AvailableLocales
  flag: Flag
}

type Config = {
  languages: Language[]
  fallbackLng: AvailableLocales
  cookieLanguage: string
  languageKeys: [AvailableLocales, ...AvailableLocales[]]
}

const config: Config = {
  languages: [
    {
      label: "Français",
      key: "fr",
      flag: "FR",
    },
    {
      label: "English",
      key: "en",
      flag: "US",
    },
  ],
  fallbackLng: "fr",
  cookieLanguage: "bbs-lang",
  languageKeys: ["fr", "en"],
}

export default config
