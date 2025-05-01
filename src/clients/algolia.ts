import { type SearchParams, algoliasearch } from 'algoliasearch'
import { environment } from '../environment'

export const algoliaClient = algoliasearch(environment.algolia.appId, environment.algolia.apiKey)
export const algoliaIndex = {
  deleteObjects: (objectIdsToDelete: string[]) =>
    algoliaClient.deleteObjects({
      indexName: environment.algolia.index,
      objectIDs: objectIdsToDelete,
    }),
  search: (query: string, searchParams: SearchParams) =>
    algoliaClient.searchSingleIndex({
      indexName: environment.algolia.index,
      searchParams: {
        ...searchParams,
        query,
      },
    }),
  browseObjects: async () => {
    const acc: { objectID: string }[] = []
    let finished = false
    let page = 0
    do {
      const results = await algoliaClient.browse({
        indexName: environment.algolia.index,
        browseParams: { page, hitsPerPage: 1000 },
      })
      if (results.hits.length) acc.push(...results.hits)

      if ((results.nbPages ?? 0) > page + 1) page += 1
      else finished = true
    } while (!finished)

    return acc
  },
}
