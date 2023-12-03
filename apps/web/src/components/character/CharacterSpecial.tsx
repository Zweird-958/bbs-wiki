import Subtitle from "@/components/ui/Subtitle"
import { useLanguage } from "@/hooks/useLanguage"
import { CharacterDetails } from "@bbs/types/Character"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/react"

type Props = {
  name: CharacterDetails["exIntroductionName"]
  description: CharacterDetails["exIntroductionDescription"]
}

const CharacterSpecial = (props: Props) => {
  const { name, description } = props
  const {
    translations: { character: characterTranslations },
  } = useLanguage()

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <p>{characterTranslations.specialAttack}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{name}</p>
        <Subtitle>{description}</Subtitle>
      </CardBody>
    </Card>
  )
}

export default CharacterSpecial
