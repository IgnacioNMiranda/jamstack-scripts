import { contentfulClient } from '../../clients/contentful'
import { environment } from '../../environment'

/**
 * Return the controls of a given content type
 */
export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const env = await space.getEnvironment(environment.contentful.env)
  const contentType = await env.getContentType(environment.contentful.contentType)
  const editor = await contentType.getEditorInterface()
  return editor.controls
}
