import { characterRouter } from "./router/character"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  // auth: authRouter,
  character: characterRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
