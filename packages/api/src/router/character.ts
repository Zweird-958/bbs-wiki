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
import filterAbilities from "../utils/ability/filterAbilities"
import formatAbilities from "../utils/ability/formatAbilities"
import getTotalParameter from "../utils/ability/getTotalParameter"
import mergeTotalParameter from "../utils/ability/mergeTotalParameter"
import orderAbilities from "../utils/ability/orderAbilities"
import splitAbilities from "../utils/ability/splitAbilities"
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
        ({ characterIds: ids }) => ids[0]!,
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
        const uniqueCharacter = charactersUnique.find(({ characterIds: ids }) =>
          ids.includes(char.id),
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
    .query(async ({ ctx: { db }, input: { id: characterId } }) => {
      const currentCharacterUnique = await db.query.characterUnique.findFirst({
        where: eq(characterUnique.id, characterId),
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
          passiveAbilities: {
            with: {
              description: true,
            },
          },
          abilities: {
            with: {
              info: {
                with: {
                  description: true,
                },
              },
              info2: {
                with: {
                  description: true,
                },
              },
              boost: {
                with: {
                  description: true,
                },
              },
            },
          },
          gauge: {
            with: {
              description: true,
            },
          },
        },
        where: eq(character.id, currentCharacterUnique.characterIds[0]),
      })

      if (!currentCharacter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Character not found",
        })
      }

      const abilitiesSplited = splitAbilities(currentCharacter.abilities)
      const abilitiesDuplicate = filterAbilities(abilitiesSplited, true)
      const abilitiesUnique = filterAbilities(abilitiesSplited)
      const duplicateOrdered = orderAbilities(abilitiesDuplicate)
      const duplicatedSoulLinkOrdered = orderAbilities(abilitiesDuplicate, true)
      const duplicatedTotalParameter = getTotalParameter(duplicateOrdered)
      const duplicatedSoulTotalParameter = getTotalParameter(
        duplicatedSoulLinkOrdered,
      )
      const abilitiesTotalParameter = mergeTotalParameter([
        ...duplicatedTotalParameter,
        ...duplicatedSoulTotalParameter,
      ])
      const abilities = await formatAbilities([
        ...abilitiesTotalParameter,
        ...abilitiesUnique,
      ])
      const soulLinkAbilities = await formatAbilities([
        ...abilitiesUnique.filter(({ isLinkSkill }) => isLinkSkill),
        ...duplicatedSoulTotalParameter,
      ])

      return {
        ...formatCharacter(currentCharacterUnique, currentCharacter),
        name: currentCharacter.name?.contentFr,
        exIntroductionName: currentCharacter.exIntroductionName?.contentFr,
        exIntroductionDescription:
          currentCharacter.exIntroductionDescription?.contentFr,
        passiveAbilities: currentCharacter.passiveAbilities.map(
          ({ viewParameter, format, description, id }) => ({
            id,
            value: viewParameter,
            format,
            name: description?.contentFr,
          }),
        ),
        abilities,
        linkSkills: soulLinkAbilities,
        gaugeAbilities: currentCharacter.gauge.map(
          ({ description, id, parameter, format }) => ({
            id,
            name: description?.contentFr,
            value: parameter,
            format,
          }),
        ),
      }
    }),
})
