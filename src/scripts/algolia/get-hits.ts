import { algoliaIndex } from '../../clients'

export default async () => {
  return algoliaIndex.search('', {
    filters:
      '"attributes.End Markets.values":"Nuclear Power" OR "attributes.End Markets.values":"Medical"',
  })
}
