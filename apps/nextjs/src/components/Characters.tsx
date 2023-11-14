"use client"

import { api } from "@/utils/api"

const Characters = () => {
  const characters = api.character.all.useQuery()

  return (
    <div>
      {characters?.data?.map(({ id, fullName, startDate }) => (
        <div key={id}>
          {fullName}
          {startDate?.toString()}
        </div>
      ))}
    </div>
  )
}

export default Characters
