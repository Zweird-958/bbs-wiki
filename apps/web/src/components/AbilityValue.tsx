"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { AbilityFormatted } from "@bbs/types/Ability"

const AbilityValue = (props: Pick<AbilityFormatted, "format" | "value">) => {
  const { format, value } = props
  const {
    translations: { common },
  } = useLanguage()

  if (!value || format === "none") {
    return null
  }

  return (
    <p>
      {format === "plus" && "+"}
      {value > 0 && format === "plus_sec" ? value / 1000 : value}
      {format === "percent" && "%"}
      {format === "plus_sec" && common.second}
    </p>
  )
}

export default AbilityValue
