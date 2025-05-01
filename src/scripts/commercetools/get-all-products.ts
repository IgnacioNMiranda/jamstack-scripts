import type { ProductProjection } from '@commercetools/platform-sdk'
import { commercetoolsClient } from '../../clients/commercetools'

const limit = 500
let offset = 0

export default async () => {
  try {
    const products: ProductProjection[] = []
    while (true) {
      const productsResponse = await commercetoolsClient
        .productProjections()
        .get({
          queryArgs: {
            limit,
            withTotal: true,
            offset,
          },
        })
        .execute()

      products.push(...productsResponse.body.results)

      offset += limit

      if (offset >= (productsResponse.body.total ?? 0)) break
    }

    return products
  } catch (error) {
    console.error(JSON.stringify(error))
    return []
  }
}
