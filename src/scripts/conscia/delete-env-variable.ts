import { consciaClient } from '../../clients/conscia'
import { input } from '@inquirer/prompts'
import { environment } from '../../environment'

export default async () => {
  const code = await input({
    message: 'Enter the variable code:',
    default: 'test',
  })

  const customerCode = await input({
    message: 'Enter the Customer Code:',
    default: environment.conscia.customerCode,
  })

  const environmentCode = await input({
    message: 'Enter the Environment Code:',
    default: environment.conscia.environmentCode,
  })

  const response = await consciaClient.deleteEnvVariable({
    code,
    customerCode,
    environmentCode,
    prod: environment.conscia.isProd,
  })
  return response
}