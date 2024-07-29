import { environment } from '../../environment'
import { contentfulClient } from '../../clients/contentful'
import { createWriteStream } from 'fs'
import { stringify } from 'csv-stringify'

const limit = 1000

/**
 * Get details of all the media assets present in a given environment in CSV format.
 */
export default async () => {
  const space = await contentfulClient.getSpace(environment.contentful.spaceId)
  const env = await space.getEnvironment(environment.contentful.env)

  let assetsFetched = 0
  const totalAssets = []
  while (true) {
    const mediaAssets = await env.getAssets({
      limit,
      skip: assetsFetched,
    })

    if (mediaAssets.items.length === 0) break

    const normAssets = mediaAssets.items
      .map((mediaAsset) => {
        if (Object.keys(mediaAsset.fields).length === 0) return undefined
        return {
          id: mediaAsset.sys.id,
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
      .filter(Boolean)

    totalAssets.push(...normAssets)
    assetsFetched += limit
  }

  const filename = 'src/outputs/get-media-asset-details.csv'
  const writableStream = createWriteStream(filename)

  const columns = [
    'id',
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
  totalAssets.forEach((asset) => {
    stringifier.write(asset)
  })

  stringifier.pipe(writableStream)
}
