// Importing env files here to validate on build
import "@bbs/auth/env.mjs"

import { env } from "./src/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@bbs/api", "@bbs/auth", "@bbs/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: [env.NEXT_PUBLIC_IMAGES_DOMAIN],
  },
}

export default config
