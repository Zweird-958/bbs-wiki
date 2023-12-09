import { useLanguage } from "@/hooks/useLanguage"
import { CharacterDetails } from "@bbs/types/Character"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"

const CharacterSoulTrait = (props: Pick<CharacterDetails, "linkSkills">) => {
  const { linkSkills } = props
  const {
    translations: { character },
  } = useLanguage()

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <p>{character.soulTrait}</p>
      </CardHeader>
      <Divider />
      <CardBody className="px-0">
        {linkSkills.map(({ soulLinkName, id: soulLinkId }, skillIndex) => (
          <div key={soulLinkId}>
            <div className="px-3">
              {soulLinkName
                ?.split("\n")
                .map((line, index) => <p key={index}>{line}</p>)}
            </div>
            {skillIndex !== linkSkills.length - 1 && (
              <Divider className="my-3" />
            )}
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default CharacterSoulTrait
