import { input } from '@inquirer/prompts'

import { consciaClient } from '../../clients/conscia'
import { environment } from '../../environment'

export default async () => {
  const customerCode = await input({
    message: 'Enter the Customer Code:',
    default: environment.conscia.customerCode,
  })

  const environmentCode = await input({
    message: 'Enter the Environment Code:',
    default: environment.conscia.environmentCode,
  })

  const ack = await input({
    message: `This will import the Conscia configuration present in outputs/conscia/export-environment.json. Are you sure you want to import it into customer:${customerCode}/env:${environmentCode}? (y/n)`,
    default: 'n',
    validate: (value) => ['n', 'y'].includes(value),
  })

  if (ack === 'y') {
    const response = await consciaClient.importEnvironment({
      customerCode,
      environmentCode,
      prod: environment.conscia.isProd,
    })
    return response
  }

  console.log('Import was cancelled.')
}
