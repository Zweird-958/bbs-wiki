import { Card, CardBody } from "@nextui-org/react"

import CharacterIcon from "@/components/character/CharacterIcon"
import { useLanguage } from "@/hooks/useLanguage"
import type { Character } from "@bbs/types/Character"

type Props = {
  character: Character
}

const CharacterCard = (props: Props) => {
  const {
    character: {
      id,
      name,
      thumb,
      element,
      variation,
      rarities,
      raritiesResurrect,
      background,
    },
  } = props
  const {
    translations: {
      common: { rarity },
    },
  } = useLanguage()
  const isManyRarities =
    rarities.length + (raritiesResurrect ? rarities.length : 0) > 1

  return (
    <Card className="bg-content2 xs:w-96 w-full rounded-lg" shadow="sm">
      <CardBody className="flex flex-row items-center gap-6 px-4 py-2">
        <CharacterIcon
          background={background}
          id={id}
          element={element}
          thumb={thumb}
        />

        <div className="flex basis-48 flex-col">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground/90 font-semibold">{name}</h3>
              <p className="text-foreground/80 text-sm">{variation}</p>
              <p className="text-foreground/80 text-sm">
                {isManyRarities ? rarity.many : rarity.single}
                {rarities.join(", ")}
                {raritiesResurrect && `, ${raritiesResurrect.join(", ")}`}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CharacterCard
