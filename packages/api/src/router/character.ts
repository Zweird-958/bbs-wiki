import { desc, inArray } from "@bbs/db"
import { character } from "@bbs/db/schema/character"

import config from "../../config"

import { pageLimitValidator, pageValidator, z } from "@bbs/validators"
import env from "../../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

type Character = {
  characters: {
    characterElement: number
    thumb: string
    id: string
    name: string | null
    variation: string | null | undefined
    rarities: number[]
    raritiesResurrect: number[] | null
  }[]
  count: number
  numberOfPages: number
}

export const characterRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        page: pageValidator,
        pageLimit: pageLimitValidator,
      }),
    )
    .query(async ({ ctx: { db, redis }, input: { page, pageLimit } }) => {
      const charactersUnique = await db.query.characterUnique.findMany()
      const characterIds = charactersUnique.map(
        ({ characterIds }) => characterIds[0]!,
      )
      const cacheKey = config.cacheKeys.allCharacters(pageLimit, page)
      const cache = await redis.get(cacheKey)

      if (cache) {
        return JSON.parse(cache) as Character
      }

      const characters = await db.query.character.findMany({
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
        offset: (page - 1) * pageLimit,
        limit: pageLimit,
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
            thumb: `${env.imagesUrl}/characters/${resource2dId}/thumb.pb`,
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
      const result = {
        characters: charactersFormatted,
        count,
        numberOfPages,
      }

      await redis.set(cacheKey, JSON.stringify(result))

      return result
    }),
})
