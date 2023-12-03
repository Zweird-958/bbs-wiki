import type { CharacterIcon as Icon } from "@bbs/types/Character"
import { Image } from "@nextui-org/image"

const CharacterIcon = (props: Icon) => {
  const { id, thumb, element, background } = props

  return (
    <div className="relative flex max-w-[120px] items-center">
      <div className="absolute z-20">
        <Image isZoomed alt={`character-${id}`} src={thumb} />
      </div>
      <Image isZoomed alt={`background-${id}`} src={background} />
      <div className="2xs:max-w-[32px] absolute z-30 flex h-full w-full max-w-[25px] items-end">
        <Image alt={`element-${id}`} src={element} radius="none" />
      </div>
    </div>
  )
}

export default CharacterIcon
