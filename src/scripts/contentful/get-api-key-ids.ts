import { contentfulClient } from '../../clients/contentful'
import { environment } from '../../environment'

/**
 * Get API Keys for a given space
 */
export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const apiKeys = await space.getApiKeys()
  return apiKeys.items
}
