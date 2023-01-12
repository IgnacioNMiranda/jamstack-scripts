import algoliasearch from 'algoliasearch'
import { environment } from '../environment'

export const algoliaClient = algoliasearch(environment.algolia.appId, environment.algolia.apiKey)
export const algoliaIndex = algoliaClient.initIndex(environment.algolia.index)
