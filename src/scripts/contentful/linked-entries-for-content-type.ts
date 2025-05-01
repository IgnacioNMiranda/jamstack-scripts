import type { Entry } from 'contentful-management'
import { contentfulClient } from '../../clients/contentful'
import { environment } from '../../environment'

const entriesWithMoreThanOneLink: { entry: Entry; links: number }[] = []

const limit = 1000

/**
 * Display a summary of the linked entries for all the entries of a given content type.
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

    if (entries.items.length === 0) break
    for (let i = 0; i < entries.items.length; i++) {
      const entry = entries.items[i]
      const linkedEntries = await env.getEntries({
        links_to_entry: entry.sys.id,
        include: 0,
      })
      if (linkedEntries.items.length > 1)
        entriesWithMoreThanOneLink.push({
          entry,
          links: linkedEntries.items.length,
        })
    }
    entriesFetched += limit
  }

  for (const { entry, links } of entriesWithMoreThanOneLink) {
    console.info(entry.fields.name[environment.contentful.locale], '; links to this entry:', links)
  }

  const sum = entriesWithMoreThanOneLink.reduce((prev, entry) => prev + entry.links, 0)

  console.log('------------------------')

  console.info('Entries with more than one link', entriesWithMoreThanOneLink.length)
  console.info('Total link entries', sum)
  console.info('Average of linked entries', sum / entriesWithMoreThanOneLink.length)
}
