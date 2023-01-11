import { environment } from '../../environment'
import { contentfulClient } from '../../clients'

// String array
const ids = ['1', '2', '3']

contentfulClient.getSpace(environment.contentful.spaceId).then((space) => {
  space.getEnvironment(environment.contentful.env).then((env) => {
    env
      .getEntries({
        content_type: environment.contentful.contentType,
        // 'sku' or any field that has to match certain criteria
        'fields.sku[in]': ids.join(','),
      })
      .then(async (entries) => {
        const responses = entries.items.map(async (entry) => {
          if (entry.sys.publishedAt) {
            await entry.unpublish()
          }
          return env.deleteEntry(entry.sys.id)
        })
        await Promise.all(responses)
      })
  })
})
