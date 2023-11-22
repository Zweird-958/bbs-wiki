import { Card, CardBody, Image } from "@nextui-org/react"

type Props = {
  character: Character
}

type Character = {
  characterElement: number
  thumb: string
  id: string
  name: string | null
  variation: string | null | undefined
  rarities: number[]
  raritiesResurrect: number[] | null
}

const CharacterCard = (props: Props) => {
  const {
    character: { id, name, thumb, variation, rarities, raritiesResurrect },
  } = props

  return (
    <Card className="bg-content2 w-96 rounded-lg" shadow="sm">
      <CardBody className="flex flex-row items-center gap-6 px-4 py-2">
        <div className="h-32 basis-32 ">
          <Image
            isZoomed
            alt={name ?? id}
            className="object-cover"
            src={thumb}
          />
        </div>

        <div className="flex  basis-48 flex-col">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground/90 font-semibold">{name}</h3>
              <p className="text-foreground/80 text-sm">{variation}</p>
              <p className="text-foreground/80 text-sm">
                Rarities: {rarities.join(", ")}
                {raritiesResurrect && `, ${raritiesResurrect.join(", ")}`}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CharacterCard
