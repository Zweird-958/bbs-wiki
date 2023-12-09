"use client"

import CharacterAbilities from "@/components/character/CharacterAbilities"
import CharacterIcon from "@/components/character/CharacterIcon"
import CharacterInfo from "@/components/character/CharacterInfo"
import CharacterSoulTrait from "@/components/character/CharacterSoulTrait"
import CharacterSpecial from "@/components/character/CharacterSpecial"
import CenterDiv from "@/components/ui/CenterDiv"
import Loader from "@/components/ui/Loader"
import { api } from "@/utils/api"
import { CharacterUnique } from "@bbs/types/Character"
import { Card, CardBody } from "@nextui-org/card"

type Props = {
  characterId: CharacterUnique["id"]
}

const CharacterDetail = (props: Props) => {
  const { characterId } = props

  const {
    isLoading,
    error,
    data: character,
  } = api.character.one.useQuery({
    id: characterId,
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <CenterDiv>{error.message}</CenterDiv>
  }

  const {
    name,
    fullName,
    variation,
    exIntroductionName,
    exIntroductionDescription,
    background,
    element,
    id,
    thumb,
    passiveAbilities,
    abilities,
    linkSkills,
  } = character

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <Card>
        <CardBody className="flex items-center">
          <CharacterIcon
            background={background}
            element={element}
            id={id}
            thumb={thumb}
          />
        </CardBody>
      </Card>
      <CharacterSpecial
        name={exIntroductionName}
        description={exIntroductionDescription}
      />
      <CharacterInfo fullName={fullName} name={name} variation={variation} />
      <CharacterSoulTrait linkSkills={linkSkills} />
      <CharacterAbilities abilities={passiveAbilities} isPassive />
      <CharacterAbilities abilities={abilities} />
    </div>
  )
}

export default CharacterDetail
