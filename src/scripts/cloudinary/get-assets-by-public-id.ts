import { input } from '@inquirer/prompts'
import { cloudinaryClient } from '../../clients/cloudinary'

export default async () => {
  const publicIds = await input({
    message: "Enter the asset's public ids separated by comma",
  })
  const publicIdsParsed = publicIds.split(',')

  const response = await cloudinaryClient.api.resources_by_ids(publicIdsParsed)
  return response
}
