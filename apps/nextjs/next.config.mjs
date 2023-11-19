// Importing env files here to validate on build
import "@bbs/auth/env.mjs"
import "./src/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@bbs/api", "@bbs/auth", "@bbs/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["pub-83004e88915545ceb68d3a6f2b42ccc5.r2.dev"],
  },
}

export default config
