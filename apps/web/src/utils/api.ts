import type { AppRouter } from "@bbs/api"
import { createTRPCReact } from "@trpc/react-query"

export const api = createTRPCReact<AppRouter>()

export { type RouterInputs, type RouterOutputs } from "@bbs/api"
