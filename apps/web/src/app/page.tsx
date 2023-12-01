import getServerLanguage from "@/utils/getServerLanguage"
import getTranslations from "@/utils/language/getTranslations"

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
