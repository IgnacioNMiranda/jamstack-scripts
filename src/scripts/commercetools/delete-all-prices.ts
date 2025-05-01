import { commercetoolsClient } from '../../clients/commercetools'
import getAllProducts from './get-all-products'

export default async () => {
  try {
    const products = await getAllProducts()

    const priceMapping = products.map(product => ({
      id: product.id,
      version: product.version,
      prices: [product.masterVariant, ...product.variants]
        .map(variant => variant.prices?.map(price => price.id))
        .flat(Number.POSITIVE_INFINITY) as string[],
    }))

    for (let i = 0; i < priceMapping.length; i++) {
      const priceItem = priceMapping[i]

      await commercetoolsClient
        .products()
        .withId({ ID: priceItem.id })
        .post({
          body: {
            version: priceItem.version,
            actions: priceItem.prices.map(priceId => ({
              action: 'removePrice',
              priceId,
            })),
          },
        })
        .execute()
    }
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
