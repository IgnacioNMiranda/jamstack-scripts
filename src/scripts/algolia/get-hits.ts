import { algoliaIndex } from '../../clients/algolia'

export default async () => {
  return algoliaIndex.search('', {
    filters: '',
    facets: ['*'],
  })
}
