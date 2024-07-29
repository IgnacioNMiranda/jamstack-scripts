import { input } from '@inquirer/prompts'
import { consciaClient } from '../../clients/conscia'

export default async () => {
  const secretKey = await input({
    message: 'Enter the secret key:',
    default: 'test',
  })

  const secretValue = await input({
    message: 'Enter the secret value:',
    default: 'test',
  })

  const response = await consciaClient.updateSecret({
    secretKey,
    secretValue,
    dev: true,
  })
  return response
}
