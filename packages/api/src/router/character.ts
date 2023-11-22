import { z } from "zod"

import { desc, inArray } from "@bbs/db"
import { character } from "@bbs/db/schema/character"

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

      const characters = await ctx.db.query.character.findMany({
        columns: {
          id: true,
          resource2dId: true,
          characterElement: true,
        },
        with: {
          fullName: {
            columns: {
              dictKey: false,
            },
          },
          variation: {
            columns: {
              dictKey: false,
            },
          },
        },
        where: inArray(character.id, characterIds),
        orderBy: [desc(character.startDate), desc(character.id)],
        offset: (page - 1) * config.pageLimit,
        limit: config.pageLimit,
      })

      const charactersFormatted = characters.map(
        ({ resource2dId, id, fullName, variation, ...character }) => {
          const uniqueCharacter = charactersUnique.find(({ characterIds }) =>
            characterIds.includes(id),
          )

          if (!uniqueCharacter) {
            throw new Error("Character not found")
          }

          return {
            thumb: `${env.IMAGES_URL}/${resource2dId}/thumb.pb`,
            id: uniqueCharacter.id,
            name: fullName.contentFr,
            variation: variation?.contentFr,
            rarities: uniqueCharacter.rarities,
            raritiesResurrect: uniqueCharacter.raritiesResurrect,
            ...character,
          }
        },
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
