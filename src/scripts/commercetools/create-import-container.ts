import { input } from '@inquirer/prompts'
import { commercetoolsImportClient } from '../../clients/commercetools-import'

export default async () => {
  const containerKey = await input({
    message: 'Enter the container key:',
    default: 'my-import-container',
  })

  try {
    const importContainer = await commercetoolsImportClient
      .importContainers()
      .post({
        body: {
          key: containerKey,
        },
      })
      .execute()

    return importContainer
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
