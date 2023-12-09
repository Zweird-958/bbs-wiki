import { AbilityWithRelation } from "@bbs/types/Ability"

const filterAbilities = (
  abilities: AbilityWithRelation[],
  duplicate: boolean = false,
) =>
  abilities.filter((item) => {
    const filteredLength = abilities.filter(
      ({ type }) => type === item.type,
    ).length

    return duplicate ? filteredLength > 1 : filteredLength === 1
  })

export default filterAbilities
