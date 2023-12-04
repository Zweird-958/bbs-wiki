import acceptLanguage from "accept-language"
import { NextResponse, type NextRequest } from "next/server"

import { languageSchema } from "@/schemas"
import languageConfig from "@/utils/config"

acceptLanguage.languages(languageConfig.languageKeys)

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}

export function middleware(req: NextRequest) {
  const { headers, cookies } = req

  const lang = languageSchema
    .catch(() => {
      const headerLanguage = headers.get("Accept-Language")

      return languageSchema
        .catch(languageConfig.fallbackLng)
        .parse(acceptLanguage.get(headerLanguage))
    })
    .parse(cookies.get(languageConfig.cookieLanguage)?.value)

  const response = NextResponse.next()
  response.cookies.set(languageConfig.cookieLanguage, lang)

  return response
}
