import { input } from '@inquirer/prompts'
import type { ResourceApiResponse } from 'cloudinary'
import { cloudinaryClient } from '../../clients/cloudinary'

export default async () => {
  const folder = await input({
    message: 'Enter the folder:',
  })

  const response = await cloudinaryClient.search.expression(`folder=${folder}`).max_results(60).execute()

  const mappers = (response as ResourceApiResponse).resources.map(res => {
    return cloudinaryClient.api.update(res.public_id, {
      context: '{key}=value',
    })
  })
  const updateResponses = await Promise.all(mappers)
  return updateResponses
}
