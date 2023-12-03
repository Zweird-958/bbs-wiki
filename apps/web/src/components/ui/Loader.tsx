import CenterDiv from "@/components/ui/CenterDiv"
import { Spinner } from "@nextui-org/spinner"

const Loader = () => {
  return (
    <CenterDiv>
      <Spinner size="lg" />
    </CenterDiv>
  )
}

export default Loader
