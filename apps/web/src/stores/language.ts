import { create } from "zustand"

import common from "@/locales/fr/common.json"
import type { AvailableLocales, Translations } from "@/types/Locale"
import config from "@/utils/config"

interface LanguageStore {
  language: AvailableLocales
  setLanguage: (Language: AvailableLocales) => void
  translations: Translations
  setTranslations: (translations: Translations) => void
  selectedKeys: Set<AvailableLocales>
  setSelectedKeys: (selectedKeys: Set<AvailableLocales>) => void
}

const defaultTranslation = {
  common: common,
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: config.fallbackLng,
  setLanguage: (language) => set({ language }),
  translations: defaultTranslation,
  setTranslations: (translations) => set({ translations }),
  selectedKeys: new Set([config.fallbackLng]),
  setSelectedKeys: (selectedKeys) => set({ selectedKeys }),
}))
