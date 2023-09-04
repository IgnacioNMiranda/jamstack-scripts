import { environment } from '../../environment'
import { contentfulClient } from '../../clients'

const limit = 25

/**
 * Update all entries of a given content type based on a given criteria
 * (defined in line 24)
 */
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
    if (entries.items.length === 0) return
    const responses = entries.items.map(async (entry) => {
      // Set your criteria to update the entries
      const criteria = entry.fields.any[environment.contentful.locale] === 'null'
      if (criteria) {
        // Update entry fields
        // entry.fields.field[environment.contentful.locale] = 'some value'
        return entry.update()
      }
    })
    await Promise.all(responses)
    entriesFetched += limit
  }
}
