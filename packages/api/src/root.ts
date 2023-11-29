import { characterRouter } from "./router/character"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  character: characterRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
