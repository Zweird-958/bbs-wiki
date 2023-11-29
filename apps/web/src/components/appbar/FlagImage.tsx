import { Image } from "@nextui-org/image"

import type { Flag } from "@/types/Locale"

interface Props {
  flag?: Flag
}

const FlagImage = (props: Props) => {
  const { flag } = props

  return (
    <Image
      alt={flag}
      className="h-6 object-cover"
      radius="none"
      src={`https://flagsapi.com/${flag}/flat/64.png`}
    />
  )
}

export default FlagImage
