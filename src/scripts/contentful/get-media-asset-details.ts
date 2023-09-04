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
      title: mediaAsset.fields.title[environment.contentful.locale],
      ...(mediaAsset.fields.description && {
        description: mediaAsset.fields.description[environment.contentful.locale],
      }),
      ...(mediaAsset.fields.file && {
        url: mediaAsset.fields.file[environment.contentful.locale].url,
        ...(mediaAsset.fields.file[environment.contentful.locale].details?.size && {
          size: mediaAsset.fields.file[environment.contentful.locale].details?.size,
        }),
        ...(mediaAsset.fields.file[environment.contentful.locale].details?.image?.width && {
          width: mediaAsset.fields.file[environment.contentful.locale].details?.image?.width,
        }),
        ...(mediaAsset.fields.file[environment.contentful.locale].details?.image?.height && {
          height: mediaAsset.fields.file[environment.contentful.locale].details?.image?.height,
        }),
        fileName: mediaAsset.fields.file[environment.contentful.locale].fileName,
        contentType: mediaAsset.fields.file[environment.contentful.locale].contentType,
      }),
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
