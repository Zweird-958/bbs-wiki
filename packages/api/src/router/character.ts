import { desc, eq, inArray } from "@bbs/db"
import { character, characterUnique } from "@bbs/db/schema/character"

import config from "../../config"

import type { Character } from "@bbs/types/Character"
import {
  idValidator,
  pageLimitValidator,
  pageValidator,
  z,
} from "@bbs/validators"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, publicProcedure } from "../trpc"
import formatCharacter from "../utils/formatCharacter"

type AllResult = {
  characters: Character[]
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
        return JSON.parse(cache) as AllResult
      }

      const characters = await db.query.character.findMany({
        columns: {
          id: true,
          resource2dId: true,
          characterElement: true,
        },
        with: {
          fullName: true,
          variation: true,
        },
        where: inArray(character.id, characterIds),
        orderBy: [desc(character.startDate), desc(character.id)],
        offset: (page - 1) * pageLimit,
        limit: pageLimit,
      })

      const charactersFormatted = characters.map((char) => {
        const uniqueCharacter = charactersUnique.find(({ characterIds }) =>
          characterIds.includes(char.id),
        )

        if (!uniqueCharacter) {
          throw new Error("Character not found")
        }

        return formatCharacter(uniqueCharacter, char)
      })

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
  one: publicProcedure
    .input(
      z.object({
        id: idValidator,
      }),
    )
    .query(async ({ ctx: { db }, input: { id } }) => {
      const currentCharacterUnique = await db.query.characterUnique.findFirst({
        where: eq(characterUnique.id, id),
      })

      if (!currentCharacterUnique) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Character not found",
        })
      }

      const currentCharacter = await db.query.character.findFirst({
        columns: {
          id: true,
          resource2dId: true,
          characterElement: true,
        },
        with: {
          name: true,
          fullName: true,
          variation: true,
          exIntroductionName: true,
          exIntroductionDescription: true,
        },
        where: eq(character.id, currentCharacterUnique.characterIds[0]),
      })

      if (!currentCharacter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Character not found",
        })
      }

      return {
        ...formatCharacter(currentCharacterUnique, currentCharacter),
        name: currentCharacter.name?.contentFr,
        exIntroductionName: currentCharacter.exIntroductionName?.contentFr,
        exIntroductionDescription:
          currentCharacter.exIntroductionDescription?.contentFr,
      }
    }),
})
