import { Dictionary } from "./Dictionary"

export type Character = {
  element: string
  thumb: string
  id: string
  fullName: string | null
  variation: string | null | undefined
  rarities: number[]
  raritiesResurrect: number[] | null
  background: string
}

export type CharacterDetails = Character & {
  name: string | null
  exIntroductionName: string | null | undefined
  exIntroductionDescription: string | null | undefined
}

export type CharacterIcon = Pick<
  Character,
  "id" | "element" | "thumb" | "background"
>

export type CharacterUnique = {
  id: string
  characterIds: number[]
  rarities: number[]
  raritiesResurrect: number[] | null
}

export type CharacterQuery = {
  id: number
  resource2dId: string
  characterElement: number
  fullName: Dictionary
  variation: Dictionary | null
}
