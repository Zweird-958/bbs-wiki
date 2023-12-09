import { AbilityWithRelation } from "@bbs/types/Ability"
import cloneDeep from "clone-deep"

const mergeTotalParameter = (
  abilities: AbilityWithRelation[],
): AbilityWithRelation[] =>
  abilities.reduce((acc, ability) => {
    const abilityInList = acc.find(({ type }) => ability.type === type)

    if (!abilityInList) {
      acc.push(cloneDeep(ability))

      return acc
    }

    if (!ability.parameter) {
      return acc
    }

    const abilityParameter = abilityInList.parameter

    abilityInList.parameter = abilityParameter
      ? abilityParameter + ability.parameter
      : ability.parameter

    return acc
  }, [] as AbilityWithRelation[])

export default mergeTotalParameter
