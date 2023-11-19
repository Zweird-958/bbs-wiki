import type { Metadata } from "next"

import "@/styles/globals.css"

import { headers } from "next/headers"

import { TRPCReactProvider } from "./providers"

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

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <TRPCReactProvider headers={headers()}>
          {props.children}
        </TRPCReactProvider>
      </body>
    </html>
  )
}
