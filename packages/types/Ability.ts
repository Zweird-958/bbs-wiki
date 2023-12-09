import {
  characterAbility,
  characterAbilityPriority,
  characterAbilityStatus,
} from "@bbs/db/schema/character"
import { Description } from "./Dictionary"

export type Ability = typeof characterAbility.$inferSelect
export type Boost = typeof characterAbilityStatus.$inferSelect
export type Info = typeof characterAbilityPriority.$inferSelect
export type InfoWithRelation =
  | ({
      description: Description
    } & Info)
  | null

export type AbilityWithRelation = {
  boost:
    | ({
        description: Description
      } & Boost)
    | null
  info: InfoWithRelation
  info2: InfoWithRelation
} & Ability
export type AbilitiesOrdered = Record<string, AbilityWithRelation[]>
export type AbilityFormatted = {
  id: number
  value: number | null
  format: "plus" | "none" | "interval" | "percent" | "plus_sec" | null
  name: string | null | undefined
}
