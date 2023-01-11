import { algoliaIndex } from '../../clients'

/**
 * Script that keeps specific and known IDs.
 */
const objectIdsToKeep = []

let hits = []
algoliaIndex
  .browseObjects({
    batch: (batch) => {
      hits = hits.concat(batch)
    },
  })
  .then(() => {
    const objectIds = hits.map((hit) => hit.objectID)
    const objectIdsToDelete = objectIds.filter((objectId) => !objectIdsToKeep.includes(objectId))
    algoliaIndex.deleteObjects(objectIdsToDelete)
  })
