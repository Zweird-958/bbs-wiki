import { AbilityWithRelation } from "@bbs/types/Ability"

const splitAbilities = (abilities: AbilityWithRelation[]) =>
  abilities
    .map((ability) =>
      ability.info2
        ? [
            ability,
            {
              ...ability,
              info: ability.info2,
              parameter: ability.parameter2,
              type: ability.type2,
            },
          ]
        : ability,
    )
    .flat()

export default splitAbilities
