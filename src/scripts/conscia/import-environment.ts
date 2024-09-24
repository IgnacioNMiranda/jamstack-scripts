import { input, select } from '@inquirer/prompts'

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

  const preserveSecrets = await select({
    message:
      'Do you want to preserve secrets? (Secrets on the target environment will be retained and the Secrets in the input config will be ignored).',
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
    ],
  })

  const preserveEnvironmentVariables = await select({
    message:
      'Do you want to preserve env. variables? (Env. variables on the target environment will be retained, and the Env. variables in the input config will be ignored)',
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
    ],
  })

  const ack = await select({
    message: `This will import the Conscia configuration present in outputs/conscia/export-environment.json. Are you sure you want to import it into customer:${customerCode}/env:${environmentCode}?`,
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
    ],
  })

  if (ack) {
    const response = await consciaClient.importEnvironment({
      customerCode,
      environmentCode,
      prod: environment.conscia.isProd,
      preserveSecrets,
      preserveEnvironmentVariables,
    })
    return response
  }

  console.log('Import was cancelled.')
}
