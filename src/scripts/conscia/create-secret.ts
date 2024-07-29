import { consciaClient } from '../../clients/conscia'
import { input } from '@inquirer/prompts'

export default async () => {
  const secretKey = await input({
    message: 'Enter the secret key:',
    default: 'test',
  })

  const secretValue = await input({
    message: 'Enter the secret value:',
    default: 'test',
  })

  const response = await consciaClient.createSecret({
    secretKey,
    secretValue,
    dev: true,
  })
  return response
}
