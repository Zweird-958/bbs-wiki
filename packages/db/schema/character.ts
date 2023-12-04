import { relations, sql } from "drizzle-orm"
import {
  integer,
  pgEnum,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { dictionarySchema, pgTable } from "./_table"

export const formatEnum = pgEnum("format", [
  "plus",
  "none",
  "interval",
  "percent",
])

export const character = pgTable("character", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  namePhonetic: text("name_phonetic").notNull(),
  variation: text("variation"),
  charaIdentityId: text("chara_identity_id").notNull(),
  resource2dId: text("resource_2d_id").notNull(),
  resource3dId: text("resource_3d_id").notNull(),
  disableCharaImageDropShadow: integer(
    "disable_chara_image_drop_shadow",
  ).notNull(),
  rarity: integer("rarity").notNull(),
  characterCategory: text("character_category").notNull(),
  characterElement: integer("character_element").notNull(),
  isResurrect: integer("is_resurrect").notNull(),
  initHp: integer("init_hp").notNull(),
  initSp: integer("init_sp").notNull(),
  initAtk: integer("init_atk").notNull(),
  initDef: integer("init_def").notNull(),
  initCrt: integer("init_crt").notNull(),
  firstMaxHp: integer("first_max_hp").notNull(),
  firstMaxSp: integer("first_max_sp").notNull(),
  firstMaxAtk: integer("first_max_atk").notNull(),
  firstMaxDef: integer("first_max_def").notNull(),
  firstMaxCrt: integer("first_max_crt").notNull(),
  secondMaxHp: integer("second_max_hp").notNull(),
  secondMaxSp: integer("second_max_sp").notNull(),
  secondMaxAtk: integer("second_max_atk").notNull(),
  secondMaxDef: integer("second_max_def").notNull(),
  secondMaxCrt: integer("second_max_crt").notNull(),
  thirdMaxHp: integer("third_max_hp"),
  thirdMaxSp: integer("third_max_sp"),
  thirdMaxAtk: integer("third_max_atk"),
  thirdMaxDef: integer("third_max_def"),
  thirdMaxCrt: integer("third_max_crt"),
  dashType: text("dash_type"),
  speed: integer("speed"),
  characterAttackGroupIdNormal: integer(
    "character_attack_group_id_normal",
  ).notNull(),
  characterAttackGroupIdHeavy1: integer(
    "character_attack_group_id_heavy1",
  ).notNull(),
  characterAttackGroupdIdHeavy2: integer(
    "character_attack_group_id_heavy2",
  ).notNull(),
  characterAttackGroupdIdHeavy3: integer(
    "character_attack_group_id_heavy3",
  ).notNull(),
  characterAttackGroupIdEx: integer("character_attack_group_id_ex").notNull(),
  exAtkResource3dId: text("ex_atk_resource_3d_id"),
  exCutinResource3dId: text("ex_cutin_resource_3d_id"),
  characterShiftId: integer("character_shift_id"),
  characterBuddyId: integer("character_buddy_id"),
  killerType1: text("killer_type1"),
  killerType2: text("killer_type2"),
  maxExGauge: integer("max_ex_gauge").notNull(),
  mSoulPiecePatternId: integer("m_soul_piece_pattern_id").notNull(),
  mPotentialMaterialPatternId: integer("m_potential_material_pattern_id"),
  mPassiveAbilityGroupId: integer("m_passive_ability_group_id"),
  mArenaSkillGroupId: integer("m_arena_skill_group_id"),
  mArenaAbilityGroupId: integer("m_arena_ability_group_id"),
  profile: text("profile"),
  shortProfile: text("short_profile"),
  exIntroductionName: text("ex_introduction_name"),
  exIntroductionDescription: text("ex_introduction_description"),
  bookOrder: integer("book_order"),
  startDate: timestamp("start_date")
    .default(sql`to_timestamp('2015-01-01', 'YYYY-MM-DD')`)
    .notNull(),
  standAnimationState: text("stand_animation_state"),
  questStartVoiceEvent: text("quest_start_voice_event"),
  standFace: integer("stand_face"),
  imageScale: integer("image_scale").notNull(),
  gachaMessageBankEvent: text("gacha_message_bank_event"),
  gachaMessageDirection: text("gacha_message_direction"),
  gachaMessageDictKey: text("gacha_message_dict_key"),
  gachaParticlePattern: text("gacha_particle_pattern"),
  backgroundImagePath: text("background_image_path"),
  disableUnlockItem: integer("disable_unlock_item"),
  potentialPoint: integer("potential_point"),
  boostGaugeTrigger: text("boost_gauge_trigger"),
  mBoostGaugeAbilityGroupId: integer("m_boost_gauge_ability_group_id"),
})
export const characterRelations = relations(character, ({ one, many }) => ({
  name: one(characterName, {
    fields: [character.name],
    references: [characterName.dictKey],
  }),
  fullName: one(characterFullName, {
    fields: [character.fullName],
    references: [characterFullName.dictKey],
  }),
  variation: one(characterVariation, {
    fields: [character.variation],
    references: [characterVariation.dictKey],
  }),
  exIntroductionName: one(characterSpecialName, {
    fields: [character.exIntroductionName],
    references: [characterSpecialName.dictKey],
  }),
  exIntroductionDescription: one(characterSpecialDescription, {
    fields: [character.exIntroductionDescription],
    references: [characterSpecialDescription.dictKey],
  }),
  passiveAbilities: many(characterPassiveAbility),
}))
export const characterUnique = pgTable("character_unique", {
  id: uuid("id").primaryKey().defaultRandom(),
  characterIds: integer("character_ids").array().unique().notNull(),
  rarities: integer("rarities").array().notNull(),
  raritiesResurrect: integer("rarities_resurrect").array(),
})
export const characterPassiveAbility = pgTable("character_passive_ability", {
  id: integer("id").primaryKey(),
  groupId: integer("group_id"),
  priority: integer("priority"),
  sortOrderPassiveAbilityFilter: integer("sort_order_passive_ability_filter"),
  passiveAbilityFilterReleaseDate: timestamp(
    "passive_ability_filter_release_date",
  ),
  type: text("type"),
  viewParameter: real("view_parameter"),
  format: formatEnum("format"),
  description: text("description"),
  parameterName1: text("parameter_name1"),
  parameter1: real("parameter1"),
  parameterName2: text("parameter_name2"),
  parameter2: real("parameter2"),
  parameterName3: text("parameter_name3"),
  parameter3: real("parameter3"),
})
export const characterPassiveAbilityRelations = relations(
  characterPassiveAbility,
  ({ one }) => ({
    groupId: one(character, {
      fields: [characterPassiveAbility.groupId],
      references: [character.mPassiveAbilityGroupId],
    }),
    description: one(characterPassiveAbilityDescription, {
      fields: [characterPassiveAbility.description],
      references: [characterPassiveAbilityDescription.dictKey],
    }),
  }),
)

// Dictionary

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
