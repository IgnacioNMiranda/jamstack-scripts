import { algoliaIndex } from '../../clients/algolia'

/**
 * Script that keeps specific and known IDs.
 */
const objectIdsToKeep: string[] = []

algoliaIndex.browseObjects().then(hits => {
  const objectIds = hits.map(hit => hit.objectID)
  const objectIdsToDelete = objectIds.filter(objectId => !objectIdsToKeep.includes(objectId))
  algoliaIndex.deleteObjects(objectIdsToDelete)
})
