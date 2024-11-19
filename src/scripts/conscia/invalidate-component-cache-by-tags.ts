import { consciaClient } from '../../clients/conscia'
import { input } from '@inquirer/prompts'
import { environment } from '../../environment'

export default async () => {
  const code = await input({
    message: 'Enter the component code:',
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

  const tags = await input({
    message: 'Enter tags separated by comma:',
  })
  const parsedTags = tags.split(',').filter(Boolean)

  const response = await consciaClient.invalidateComponentCacheByTags({
    code,
    customerCode,
    environmentCode,
    prod: environment.conscia.isProd,
    tags: parsedTags,
  })
  return response
}
