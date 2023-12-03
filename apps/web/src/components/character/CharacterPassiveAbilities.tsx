import { useLanguage } from "@/hooks/useLanguage"
import { CharacterDetails } from "@bbs/types/Character"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Listbox, ListboxItem } from "@nextui-org/listbox"

const CharacterPassiveAbilities = (
  props: Pick<CharacterDetails, "passiveAbilities">,
) => {
  const { passiveAbilities } = props
  const {
    translations: { character },
  } = useLanguage()

  return (
    <Card>
      <CardHeader>{character.passiveAbilities}</CardHeader>
      <Divider />
      <CardBody>
        <Listbox aria-label="Actions" items={passiveAbilities}>
          {({ id, name, value, format }) => (
            <ListboxItem key={id}>
              <div className="flex justify-between">
                <p>{name}</p>
                <p>
                  {format === "plus" && "+"}
                  {value ? value > 0 && value : null}
                  {format === "percent" && "%"}
                </p>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </CardBody>
    </Card>
  )
}

export default CharacterPassiveAbilities
