import { db, eq, or } from "@bbs/db"
import { characterAbilityName } from "@bbs/db/schema/dictionary"
import { AbilityWithRelation } from "@bbs/types/Ability"

const formatAbilities = async (abilities: AbilityWithRelation[]) =>
  await Promise.all(
    abilities.map(async ({ info, parameter, id, isLinkSkill, boost }) => {
      const common = {
        id,
        value: parameter,
        format: info?.format ?? null,
        isLinkSkill,
        soulLinkName: null,
      }

      if (boost) {
        return {
          ...common,
          name: boost?.description?.contentFr,
          value: boost?.effectAmount,
        }
      }

      if (info?.type?.includes("attribute_bad_status_probability")) {
        const result = await db.query.characterAbilityName.findFirst({
          where: eq(characterAbilityName.dictKey, `${info?.type}_${parameter}`),
        })

        return { ...common, name: result?.contentFr }
      }

      if (isLinkSkill) {
        const result = await db.query.characterAbilityName.findFirst({
          where: or(
            eq(
              characterAbilityName.dictKey,
              `${info?.description?.dictKey}_with_value`,
            ),
            eq(
              characterAbilityName.dictKey,
              `soullink_${info?.type}_unlocked_detail`,
            ),
            eq(characterAbilityName.dictKey, `${info?.type}_with_value`),
          ),
        })

        return {
          ...common,
          soulLinkName:
            result?.contentFr
              ?.replaceAll("[nbsp]", "")
              .replace("{value}", parameter ? parameter.toString() : "") ??
            info?.description?.contentFr,
          name: info?.description?.contentFr,
        }
      }

      return {
        ...common,
        name: info?.description?.contentFr,
      }
    }),
  )

export default formatAbilities
