import { environment } from '../../environment'
import { contentfulClient } from '../../clients'

/**
 * Get API Keys for a given space
 */
export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const apiKeys = await space.getApiKeys()
  return apiKeys.items
}
