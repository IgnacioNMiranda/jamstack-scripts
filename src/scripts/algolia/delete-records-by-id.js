import { algoliaIndex } from '../../clients'

/**
 * Script that deletes specific and known IDs.
 */
const objectIdsToDelete = []

algoliaIndex.deleteObjects(objectIdsToDelete)
