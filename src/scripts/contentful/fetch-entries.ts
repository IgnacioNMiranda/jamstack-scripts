import { environment } from '../../environment'
import { contentfulClient } from '../../clients/contentful'
import { Entry } from 'contentful-management'

const limit = 1000

const fetchedEntries: Entry[] = []

export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const env = await space.getEnvironment(environment.contentful.env)

  let entriesFetched = 0
  while (true) {
    const entries = await env.getEntries({
      content_type: environment.contentful.contentType,
      limit,
      skip: entriesFetched,
    })
    if (entries.items.length === 0) break
    fetchedEntries.push(...entries.items)
    entriesFetched += limit
  }

  return fetchedEntries
}
