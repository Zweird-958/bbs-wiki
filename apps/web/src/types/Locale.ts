import type character from "@/locales/fr/character.json"
import type common from "@/locales/fr/common.json"

export type AvailableLocales = "fr" | "en"
export type Flag = "FR" | "US"
export interface Translations {
  common: typeof common
  character: typeof character
}
