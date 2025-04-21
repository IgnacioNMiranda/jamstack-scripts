import { createReadStream } from 'fs'
import { commercetoolsClientFetch } from '../../clients/commercetools-fetch'
import csv from 'csv-parser'
import { commercetoolsClient } from '../../clients/commercetools'
import { ProductProjection } from '@commercetools/platform-sdk'
import { RawEmbeddedPrice, EmbeddedPrices } from '../../types/prices/embedded-prices'

const transformToCentAmount = (price: number) => price * 100

export default async () => {
  try {
    const rawData: RawEmbeddedPrice[] = []
    const prices: EmbeddedPrices = {
      data: [],
    }

    /**
     * Structure for the file's columns should be:
     * SKU: required
     * Price: required
     * Currency: required
     * Country: required
     * PriceTierMinQty: optional
     * TierPrice: optional
     * PriceCustomerGroupKey: optional
     * PriceChannelKey: optional
     */
    const filename = 'src/data/commercetools/embedded-prices.csv'

    await new Promise((resolve, reject) => {
      createReadStream(filename)
        .pipe(csv())
        .on('data', async (data: RawEmbeddedPrice) => {
          rawData.push(data)
        })
        .on('error', (err) => reject(err.message))
        .on('end', async () => {
          resolve({})
        })
    })

    const skusFilter = `variants.sku:${rawData.map((price) => `"${price.SKU}"`).join(',')}`

    let offset = 0
    const limit = 500

    const commercetoolsProducts: ProductProjection[] = []
    while (true) {
      const productsResponse = await commercetoolsClient
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: skusFilter,
            limit,
            offset,
            withTotal: true,
          },
        })
        .execute()

      if (productsResponse.body.results.length)
        commercetoolsProducts.push(...productsResponse.body.results)

      offset += limit
      if (productsResponse.body.total! <= offset) break
    }

    for (let i = 0; i < rawData.length; i++) {
      const priceRecord = rawData[i]

      const product = commercetoolsProducts.find((product) => {
        const variants = [product.masterVariant, ...product.variants]
        return variants.some((variant) => variant.sku === priceRecord.SKU)
      })

      if (product) {
        const priceKeyParts = [priceRecord.SKU, priceRecord.Country, priceRecord.Currency]
        if (priceRecord.PriceCustomerGroupKey) priceKeyParts.push(priceRecord.PriceCustomerGroupKey)
        if (priceRecord.PriceChannelKey) priceKeyParts.push(priceRecord.PriceChannelKey)

        prices.data.push({
          productKey: product.key!, // Assumming it'll exist
          sku: priceRecord.SKU,
          priceKey: priceKeyParts.join('-'),
          price: transformToCentAmount(Number(priceRecord.Price)),
          country: priceRecord.Country,
          currency: priceRecord.Currency,
          priceTierMinQty: priceRecord.PriceTierMinQty
            ? transformToCentAmount(Number(priceRecord.PriceTierMinQty))
            : undefined,
          tierPrice: priceRecord.TierPrice
            ? transformToCentAmount(Number(priceRecord.TierPrice))
            : undefined,
          priceCustomerGroupKey: priceRecord.PriceCustomerGroupKey || undefined,
          priceChannelKey: priceRecord.PriceChannelKey || undefined,
        })
      }
    }
    const importedPrices = await commercetoolsClientFetch.importEmbeddedPrices({ prices })
    return importedPrices
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
