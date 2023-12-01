"use client"

import { Pagination, Spinner } from "@nextui-org/react"
import { parseAsInteger, useQueryState } from "next-usequerystate"

import CharacterCard from "@/components/character/CharacterCard"
import { api } from "@/utils/api"

const CharactersList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { isLoading, data: { characters = [], numberOfPages } = {} } =
    api.character.all.useQuery({
      page,
    })

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage)
  }

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
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
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

export default CharactersList
