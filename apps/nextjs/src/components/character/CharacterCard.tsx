import { Card, CardBody, Image } from "@nextui-org/react"

interface Props {
  name: string
  image: string
  variation: string
}

const CharacterCard = (props: Props) => {
  const { name, image, variation } = props

  return (
    <Card className="bg-content2 w-96 rounded-lg" shadow="sm">
      <CardBody className="flex flex-row items-center gap-6 px-4 py-2">
        <div className="h-32 basis-32 ">
          <Image isZoomed alt={name} className="object-cover" src={image} />
        </div>

        <div className="flex  basis-48 flex-col">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <h3 className="text-foreground/90 font-semibold">{name}</h3>
              <p className="text-small text-foreground/80">{variation}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CharacterCard
