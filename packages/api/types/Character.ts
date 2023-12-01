export type Character = {
  element: string
  thumb: string
  id: string
  name: string | null
  variation: string | null | undefined
  rarities: number[]
  raritiesResurrect: number[] | null
}
