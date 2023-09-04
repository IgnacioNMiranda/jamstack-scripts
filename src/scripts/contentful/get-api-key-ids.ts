import { environment } from '../../environment'
import { contentfulClient } from '../../clients'

/**
 * Get API Keys for a given space
 */
contentfulClient.getSpace(environment.contentful.spaceId).then(async (space) => {
  const apiKeys = await space.getApiKeys()
  console.log(JSON.stringify(apiKeys.items))
})
