import type { Metadata } from "next"

import "@/styles/globals.css"

import { headers } from "next/headers"

import AppBar from "@/components/appbar/AppBar"
import { Providers } from "./providers"

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "BBS Wiki",
  description: "Wiki for BBS",
}

type Props = {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-background">
        <Providers headers={headers()}>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
