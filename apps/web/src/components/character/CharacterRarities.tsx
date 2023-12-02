import env from "@/env"
import { Character } from "@bbs/types/Character"
import { Image } from "@nextui-org/image"

type Props = {
  isResurrect?: boolean
} & Pick<Character, "id" | "rarities">

const CharacterRarities = (props: Props) => {
  const { rarities, id, isResurrect } = props

  return (
    <div className="flex gap-1">
      {rarities.map((rarity) => (
        <div key={`${id}-${rarity}`} className="w-6 h-6 flex items-center">
          <Image
            src={`${env.imagesUrl}/rarities/${
              isResurrect ? "resurrect" : "base"
            }.png`}
            alt={rarity.toString()}
          />
          <p>{rarity}</p>
        </div>
      ))}
    </div>
  )
}

export default CharacterRarities
