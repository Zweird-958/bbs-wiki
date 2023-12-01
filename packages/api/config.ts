const config = {
  pageLimit: 20,
  pageLimitMax: 50,
  cacheKeys: {
    allCharacters: (pageLimit: number, page: number) =>
      `${pageLimit}-${page}-all-characters`,
  },
}

export default config
