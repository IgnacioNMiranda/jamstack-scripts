import { algoliaIndex } from '../../clients/algolia'

/**
 * Script that deletes specific and known IDs.
 */
const objectIdsToDelete: string[] = []

algoliaIndex.deleteObjects(objectIdsToDelete)
