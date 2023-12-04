import {
  Character,
  CharacterQuery,
  CharacterUnique,
} from "@bbs/types/Character"
import env from "../../env"

const formatCharacter = (
  uniqueCharacter: CharacterUnique,
  character: CharacterQuery,
): Character => {
  const { resource2dId, fullName, variation, characterElement } = character

  const { rarities } = uniqueCharacter
  const [maxRarity] = [...rarities].sort((a, b) => b - a)
  const variationFormatted = variation?.contentFr

  return {
    thumb: `${env.imagesUrl}/characters/${resource2dId}/thumb.png`,
    id: uniqueCharacter.id,
    fullName: fullName.contentFr,
    variation:
      variationFormatted &&
      `${variationFormatted
        ?.slice(0, 1)
        .toUpperCase()}${variationFormatted?.slice(1)}`,
    rarities,
    raritiesResurrect: uniqueCharacter.raritiesResurrect,
    element: `${env.imagesUrl}/elements/${characterElement}.png`,
    background: `${env.imagesUrl}/thumbnails/characters/${maxRarity}.png`,
  }
}

export default formatCharacter
