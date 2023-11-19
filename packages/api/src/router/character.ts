import { z } from "zod"

import { desc, eq, inArray } from "@bbs/db"
import {
  character,
  characterFullName,
  characterVariation,
} from "@bbs/db/schema/character"

import config from "../../config"
import { env } from "../../env.mjs"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const characterRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page } = input
      const charactersUnique = await ctx.db.query.characterUnique.findMany()
      const characterIds = charactersUnique.map(
        ({ characterIds }) => characterIds[0]!,
      )

      const characters = await ctx.db
        .select({
          id: character.id,
          resource2dId: character.resource2dId,
          characterElement: character.characterElement,
          variation: characterVariation.contentFr,
          name: characterFullName.contentFr,
          startDate: character.startDate,
        })
        .from(character)
        .innerJoin(
          characterFullName,
          eq(character.fullName, characterFullName.dictKey),
        )
        .leftJoin(
          characterVariation,
          eq(character.variation, characterVariation.dictKey),
        )
        .where(inArray(character.id, characterIds))
        .orderBy(desc(character.startDate), desc(character.id))
        .offset((page - 1) * config.pageLimit)
        .limit(config.pageLimit)

      const charactersFormatted = characters.map(
        ({ resource2dId, id, ...character }) => ({
          thumb: `${env.IMAGES_URL}/${resource2dId}/thumb.pb`,
          id: charactersUnique.find(({ characterIds }) =>
            characterIds.includes(id),
          )?.id,
          ...character,
        }),
      )

      const count = charactersUnique.length
      const numberOfPages = Math.ceil(count / config.pageLimit)

      return {
        characters: charactersFormatted,
        count,
        numberOfPages,
      }
    }),
})
