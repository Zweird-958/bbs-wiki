import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

import { appRouter, type AppRouter } from "./src/root"

export { createTRPCContext } from "./src/trpc"
export { appRouter, type AppRouter }

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
