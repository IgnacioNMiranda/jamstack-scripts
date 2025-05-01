import { contentfulClient } from '../../clients/contentful'
import { environment } from '../../environment'

// String array
const ids = ['1', '2', '3']

const limit = 25

export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const env = await space.getEnvironment(environment.contentful.env)

  let entriesDeleted = 0
  while (true) {
    const entries = await env.getEntries({
      content_type: environment.contentful.contentType,
      'fields.sku[in]': ids.join(','),
      limit,
      skip: entriesDeleted,
    })
    if (entries.items.length === 0) return
    const responses = entries.items.map(async entry => {
      if (entry.sys.publishedAt) {
        await entry.unpublish()
      }
      return env.deleteEntry(entry.sys.id)
    })
    await Promise.all(responses)
    entriesDeleted += limit
  }
}
