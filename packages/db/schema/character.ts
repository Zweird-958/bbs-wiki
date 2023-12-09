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
  "plus_sec",
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
  abilities: many(characterAbility),
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
export const characterAbility = pgTable("character_ability", {
  id: integer("id").primaryKey(),
  patternId: integer("pattern_id"),
  nodeId: integer("node_id"),
  level: integer("level"),
  type: text("type"),
  parameter: integer("parameter"),
  targetQuestTypes: text("target_quest_types"),
  excludeQuestTypes: text("exclude_quest_types"),
  type2: text("type2"),
  parameter2: integer("parameter2"),
  targetQuestTypes2: text("target_quest_types2"),
  excludeQuestTypes2: text("exclude_quest_types2"),
  unlockCharacterLevel: integer("unlock_character_level"),
  unlockSecondPhase: integer("unlock_second_phase"),
  consumeMCharacter1Id: integer("consume_m_character1_id"),
  consumeMCharacter1Amount: integer("consume_m_character1_amount"),
  consumeMCharacter2Id: integer("consume_m_character2_id"),
  consumeMCharacter2Amount: integer("consume_m_character2_amount"),
  consumeMCharacter3Id: integer("consume_m_character3_id"),
  consumeMCharacter3Amount: integer("consume_m_character3_amount"),
  consumePieceType: text("consume_piece_type"),
  consumePieceRank: integer("consume_piece_rank"),
  smallPiece: integer("small_piece"),
  middlePiece: integer("middle_piece"),
  largePiece: integer("large_piece"),
  consumeCoin: integer("consume_coin"),
  consumeGoldConst: integer("consume_gold_const"),
  isLinkSkill: integer("is_link_skill"),
})
export const characterAbilityPriority = pgTable("character_ability_priority", {
  id: integer("id").primaryKey(),
  priority: integer("priority"),
  sortOrder: integer("sort_order"),
  sortOrderLinkSkillFilter: integer("sort_order_link_skill_filter"),
  sortOrderEvolveSkillType: integer("sort_order_evolve_skill_type"),
  sortOrderAbilityFilter: integer("sort_order_ability_filter"),
  abilityFilterReleaseDate: timestamp("ability_filter_release_date"),
  type: text("type"),
  description: text("description"),
  description2: text("description2"),
  format: formatEnum("format"),
})
export const characterAbilityRelations = relations(
  characterAbility,
  ({ one }) => ({
    patternId: one(character, {
      fields: [characterAbility.patternId],
      references: [character.mSoulPiecePatternId],
    }),
    info: one(characterAbilityPriority, {
      fields: [characterAbility.type],
      references: [characterAbilityPriority.type],
    }),
    info2: one(characterAbilityPriority, {
      fields: [characterAbility.type2],
      references: [characterAbilityPriority.type],
    }),
    boost: one(characterAbilityStatus, {
      fields: [characterAbility.parameter],
      references: [characterAbilityStatus.groupId],
    }),
  }),
)
export const characterAbilityPriorityRelations = relations(
  characterAbilityPriority,
  ({ one }) => ({
    description: one(characterAbilityName, {
      fields: [characterAbilityPriority.description],
      references: [characterAbilityName.dictKey],
    }),
  }),
)
export const characterAbilityStatus = pgTable("character_ability_status", {
  id: integer("id").primaryKey(),
  groupId: integer("group_id"),
  priority: integer("priority"),
  statusUpType: text("status_up_type"),
  effectAmount: integer("effect_amount"),
  effectTime: integer("effect_time"),
  description: text("description"),
})
export const characterAbilityStatusRelations = relations(
  characterAbilityStatus,
  ({ one }) => ({
    description: one(characterAbilityName, {
      fields: [characterAbilityStatus.description],
      references: [characterAbilityName.dictKey],
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
export const characterAbilityName = pgTable(
  "character_ability_name",
  dictionarySchema,
)
