import { dictionarySchema, pgTable } from "./_table"

export const characterFullName = pgTable(
  "character_full_name",
  dictionarySchema,
)
export const characterVariation = pgTable(
  "character_variation",
  dictionarySchema,
)
export const characterSpecialName = pgTable(
  "character_special_name",
  dictionarySchema,
)
export const characterSpecialDescription = pgTable(
  "character_special_description",
  dictionarySchema,
)
export const characterName = pgTable("character_name", dictionarySchema)
export const characterPassiveAbilityDescription = pgTable(
  "character_passive_ability_description",
  dictionarySchema,
)
export const characterAbilityName = pgTable(
  "character_ability_name",
  dictionarySchema,
)
export const characterGaugeAbilityName = pgTable(
  "character_gauge_ability_name",
  dictionarySchema,
)
