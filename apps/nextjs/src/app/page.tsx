import Characters from "@/components/Characters"

export const runtime = "edge"

const HomePage = () => {
  return (
    <div className="flex items-center justify-center">
      <Characters />
    </div>
  )
}

export default HomePage
