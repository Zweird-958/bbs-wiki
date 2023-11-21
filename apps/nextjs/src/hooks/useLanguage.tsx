import { useCallback, useEffect } from "react"

import { useLanguageStore } from "@/stores/language"
import type { AvailableLocales } from "@/types/Locale"
import changeLanguage from "@/utils/changeLanguage"
import getLanguage from "@/utils/getLanguage"
import getTranslations from "@/utils/language/getTranslations"

export const useLanguage = () => {
  const { setLanguage, setTranslations, setSelectedKeys, ...languageStore } =
    useLanguageStore()

  const updateLanguage = useCallback(
    async (language: AvailableLocales) => {
      setLanguage(language)
      setTranslations(await getTranslations(language))
      setSelectedKeys(new Set([language]))
    },
    [setLanguage, setSelectedKeys, setTranslations],
  )

  const handleChangeLanguage = async (language: AvailableLocales) => {
    changeLanguage(language)
    await updateLanguage(language)
  }

  useEffect(() => {
    void (async () => {
      const cookieLanguage = getLanguage()
      await updateLanguage(cookieLanguage)
    })()
  }, [updateLanguage])

  return { setLanguage, handleChangeLanguage, ...languageStore }
}
