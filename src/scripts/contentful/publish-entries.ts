import { contentfulClient } from '../../clients'
import { environment } from '../../environment'

const tagIds: string[] = []

const limit = 25
contentfulClient.getSpace(environment.contentful.spaceId).then(async (space) => {
  const env = await space.getEnvironment(environment.contentful.env)
  let entriesFetched = 0
  while (true) {
    const entries = await env.getEntries({
      content_type: environment.contentful.contentType,
      // If you want to filter by tags
      // 'metadata.tags.sys.id[in]': tagIds.join(','),
      limit,
      skip: entriesFetched,
    })
    if (entries.items.length === 0) return
    const responses = entries.items.map(async (entry) => {
      // Set your criteria to update the entries
      const isPublished =
        entry.sys.version &&
        entry.sys.publishedVersion &&
        entry.sys.version === entry.sys.publishedVersion + 1
      if (!isPublished) return entry.publish()
    })
    await Promise.all(responses)
    entriesFetched += limit
  }
})
