import CharacterDetail from "@/components/character/CharacterDetail"
import { CharacterUnique } from "@bbs/types/Character"

type Props = {
  params: {
    characterId: CharacterUnique["id"]
  }
}

const Character = (props: Props) => {
  const {
    params: { characterId },
  } = props

  return <CharacterDetail characterId={characterId} />
}

export default Character
