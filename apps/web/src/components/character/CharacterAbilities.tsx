import AbilityValue from "@/components/AbilityValue"
import { CharacterDetails } from "@bbs/types/Character"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Listbox, ListboxItem } from "@nextui-org/listbox"

type Props = {
  headerTitle: string
} & Pick<CharacterDetails, "abilities">

const CharacterPassiveAbilities = (props: Props) => {
  const { abilities, headerTitle } = props

  if (abilities.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>{headerTitle}</CardHeader>
      <Divider />
      <CardBody>
        <Listbox aria-label="Actions" items={abilities}>
          {({ id, name, value, format }) => (
            <ListboxItem key={id}>
              <div className="flex justify-between">
                <p>{name}</p>
                <AbilityValue format={format} value={value} />
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </CardBody>
    </Card>
  )
}

export default CharacterPassiveAbilities
