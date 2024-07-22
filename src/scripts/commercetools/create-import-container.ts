import { commercetoolsImportClient } from '../../clients/commercetools-import'

export default async () => {
  try {
    const importContainer = await commercetoolsImportClient
      .importContainers()
      .post({
        body: {
          key: 'embedded-prices-container',
        },
      })
      .execute()

    return importContainer
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
