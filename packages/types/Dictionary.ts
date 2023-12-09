export type Dictionary = {
  dictKey: string
  contentJa: string | null
  contentEn: string | null
  contentFr: string | null
  contentTh: string | null
  contentKo: string | null
  contentSc: string | null
  contentTc: string | null
}

export type Description = (Dictionary & string) | null
