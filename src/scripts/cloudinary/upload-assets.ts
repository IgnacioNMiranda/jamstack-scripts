import { readdirSync } from 'node:fs'
import { input } from '@inquirer/prompts'
import type { UploadApiOptions } from 'cloudinary'
import { cloudinaryClient } from '../../clients/cloudinary'

export default async () => {
  const folder = await input({
    message: 'Enter the folder where the assets will be uploaded to:',
    default: undefined,
  })

  const tags = await input({
    message: 'Enter tags for all assets, separated by comma:',
    default: undefined,
  })

  const folderName = 'src/data/cloudinary/files-to-upload'
  const assetPaths = readdirSync(folderName, { withFileTypes: true })

  const uploadBuilder = assetPaths.map(assetPath => {
    // Ignore .gitkeep file
    if (assetPath.name === '.gitkeep') return

    const fullPath = `${assetPath.parentPath}/${assetPath.name}`

    const options: UploadApiOptions = {}
    if (folder) options.folder = folder
    if (tags) options.tags = tags

    return cloudinaryClient.uploader.upload(fullPath, options)
  })

  const assetResponses = await Promise.allSettled(uploadBuilder)
  return assetResponses.map(res => (res.status === 'fulfilled' ? res.value : res.reason)).filter(Boolean)
}
