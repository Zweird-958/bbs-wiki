import { AbilitiesOrdered, AbilityWithRelation } from "@bbs/types/Ability"

const getTotalParameter = (
  abilitiesOrdered: AbilitiesOrdered,
): AbilityWithRelation[] =>
  Object.entries(abilitiesOrdered).map(([_, value]) => {
    const sum = value.reduce((acc, item) => acc + (item.parameter ?? 0), 0)

    return { ...value[0], parameter: sum }
  })

export default getTotalParameter
