import { environment } from '../../environment'
import { contentfulClient } from '../../clients'
import { createWriteStream } from 'fs'
import { stringify } from 'csv-stringify'

/**
 * Get details of all the media assets present in a given environment in CSV format.
 */
export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const env = await space.getEnvironment(environment.contentful.env)
  const mediaAssets = await env.getAssets()
  const normAssets = mediaAssets.items.map((mediaAsset) => {
    return {
      title: mediaAsset.fields.title['en-US'],
      ...(mediaAsset.fields.description && { description: mediaAsset.fields.description['en-US'] }),
      url: mediaAsset.fields.file['en-US'].url,
      ...(mediaAsset.fields.file['en-US'].details?.size && {
        size: mediaAsset.fields.file['en-US'].details.size,
      }),
      ...(mediaAsset.fields.file['en-US'].details?.image?.width && {
        width: mediaAsset.fields.file['en-US'].details.image.width,
      }),
      ...(mediaAsset.fields.file['en-US'].details?.image?.height && {
        height: mediaAsset.fields.file['en-US'].details.image.height,
      }),
      fileName: mediaAsset.fields.file['en-US'].fileName,
      contentType: mediaAsset.fields.file['en-US'].contentType,
    }
  })

  const filename = 'src/outputs/get-media-asset-details.csv'
  const writableStream = createWriteStream(filename)

  const columns = [
    'title',
    'description',
    'url',
    'size',
    'width',
    'height',
    'fileName',
    'contentType',
  ]

  const stringifier = stringify({ header: true, columns: columns })
  normAssets.forEach((asset) => {
    stringifier.write(asset)
  })

  stringifier.pipe(writableStream)
}
