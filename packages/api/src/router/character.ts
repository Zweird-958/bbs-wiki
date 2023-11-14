import { desc, isNotNull, schema } from "@acme/db"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const characterRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.character.findMany({
      orderBy: desc(schema.character.startDate),
      where: ({ startDate }) => isNotNull(startDate),
    })
  }),
})
