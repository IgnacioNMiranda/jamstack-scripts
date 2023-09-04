import { environment } from '../../environment'
import { contentfulClient } from '../../clients'

/**
 * Show the controls of a given content type
 */
contentfulClient.getSpace(environment.contentful.spaceId).then(async (space) => {
  const env = await space.getEnvironment(environment.contentful.env)
  const contentType = await env.getContentType(environment.contentful.contentType)
  const editor = await contentType.getEditorInterface()
  console.log(editor.controls)
})
