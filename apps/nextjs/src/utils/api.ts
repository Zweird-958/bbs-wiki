import { createTRPCReact } from "@trpc/react-query"

import type { AppRouter } from "@bbs/api"

export const api = createTRPCReact<AppRouter>()

export { type RouterInputs, type RouterOutputs } from "@bbs/api"
