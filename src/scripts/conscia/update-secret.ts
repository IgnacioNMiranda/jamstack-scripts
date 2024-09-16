import { input } from '@inquirer/prompts'
import { consciaClient } from '../../clients/conscia'
import { environment } from '../../environment'

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
    prod: environment.conscia.isProd,
  })
  return response
}
