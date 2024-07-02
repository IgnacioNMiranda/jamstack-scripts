import { algoliaIndex } from '../../clients'

export default async () => {
  return algoliaIndex.search('', {
    filters: '',
    facets: ['*'],
  })
}
