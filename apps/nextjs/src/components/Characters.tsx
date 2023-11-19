"use client"

import { useCallback } from "react"
import { Pagination, Spinner } from "@nextui-org/react"
import CharacterCard from "~/components/CharacterCard"
import { parseAsInteger, useQueryState } from "next-usequerystate"

import { api } from "@/utils/api"

const Characters = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { isLoading, data: { characters = [], numberOfPages } = {} } =
    api.character.all.useQuery({
      page,
    })

  const handlePageChange = useCallback(
    async (newPage: number) => {
      await setPage(newPage)
    },
    [setPage],
  )

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap justify-center gap-5 px-2">
        {characters.map(({ name, variation, thumb }, index) => (
          <CharacterCard
            key={index}
            name={name}
            variation={variation}
            image={thumb}
          />
        ))}
      </div>
      {numberOfPages && (
        <Pagination
          className="mt-8 flex justify-center"
          total={numberOfPages}
          initialPage={1}
          page={page}
          size="sm"
          classNames={{
            item: "sm:w-12 sm:h-12 h-10 w-10",
            cursor: "sm:w-12 sm:h-12 h-10 w-10",
          }}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Characters
