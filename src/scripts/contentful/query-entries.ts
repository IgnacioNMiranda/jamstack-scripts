import { contentfulDeliveryClient } from '../../clients/contentful'

export default async () => {
  const entries = await contentfulDeliveryClient.getEntries()
  return entries.items
}
