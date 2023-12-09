import { AbilitiesOrdered, AbilityWithRelation } from "@bbs/types/Ability"
import merge from "deepmerge"

const orderAbilities = (
  abilities: AbilityWithRelation[],
  soulLink: boolean = false,
): AbilitiesOrdered =>
  abilities.reduce((acc, item) => {
    if (!item.type) {
      return acc
    }

    if (soulLink ? !item.isLinkSkill : item.isLinkSkill) {
      return acc
    }

    return merge(acc, { [item.type]: [item] })
  }, {})

export default orderAbilities
