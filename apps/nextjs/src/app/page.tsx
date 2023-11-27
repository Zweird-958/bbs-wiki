import { createClient } from "redis"

import getServerLanguage from "@/utils/getServerLanguage"
import getTranslations from "@/utils/language/getTranslations"

export const runtime = "edge"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = await createClient().connect()

const HomePage = async () => {
  const language = getServerLanguage()
  const { common } = await getTranslations(language)

  return (
    <div>
      <p className="text-center">{common.homePage}</p>
    </div>
  )
}

export default HomePage
