import { useLanguage } from "@/hooks/useLanguage"
import { CharacterDetails } from "@bbs/types/Character"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table"

const CharacterInfo = (
  props: Pick<CharacterDetails, "name" | "fullName" | "variation">,
) => {
  const { name, fullName, variation } = props
  const primaryInformations: Pick<
    CharacterDetails,
    "name" | "fullName" | "variation"
  > = {
    name,
    fullName,
    variation,
  }
  const {
    translations: { character: characterTranslations, common },
  } = useLanguage()

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {(
          Object.keys(primaryInformations) as Array<
            keyof typeof primaryInformations
          >
        ).map((key) => (
          <TableColumn key={key} className="w-1/3 text-center">
            {characterTranslations[key]}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        <TableRow>
          {Object.values(primaryInformations).map((value) => (
            <TableCell key={value} className="text-center">
              {value ?? common.none.female}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default CharacterInfo
