"use client"

import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { ThemeProvider } from "next-themes"
import { useState } from "react"
import superjson from "superjson"

import env from "@/env"
import { api } from "@/utils/api"

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }

  if (env.vercelUrl) {
    return `https://${env.vercelUrl}`
  }

  return `http://localhost:${env.port}`
}

export function Providers(props: {
  children: React.ReactNode
  headers?: Headers
}) {
  const [queryClient] = useState(() => new QueryClient())
  // eslint-disable-next-line no-console
  console.log(`${getBaseUrl()}/api/trpc`)

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map(props.headers)
            headers.set("x-trpc-source", "nextjs-react")

            return Object.fromEntries(headers)
          },
        }),
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ThemeProvider>{props.children}</ThemeProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </api.Provider>
  )
}
