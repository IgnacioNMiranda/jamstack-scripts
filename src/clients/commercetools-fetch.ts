// Client for endpoints that have not been implemented in normal Commercetools Client yet

import { environment } from '../environment'
import type { EmbeddedPrices } from '../types/prices/embedded-prices'
import type { EmbeddedPriceImport } from '../types/prices/price-import'

export const commercetoolsClientFetch = {
  importEmbeddedPrices: async ({
    prices,
    importContainerKey = 'embedded-prices-container',
  }: {
    prices: EmbeddedPrices
    importContainerKey?: string
  }) => {
    const headers = new Headers({
      Authorization: `Bearer ${environment.commercetools.token}`,
      'Content-Type': 'application/json',
    })

    const resources: EmbeddedPriceImport[] = prices.data.map(embeddedPrice => {
      const resource: EmbeddedPriceImport = {
        country: embeddedPrice.country,
        key: embeddedPrice.priceKey,
        productVariant: {
          typeId: 'product-variant',
          key: embeddedPrice.sku,
        },
        product: {
          typeId: 'product',
          key: embeddedPrice.productKey,
        },
        value: {
          type: 'centPrecision',
          currencyCode: embeddedPrice.currency,
          centAmount: embeddedPrice.price,
          fractionDigits: 2,
        },
      }

      if (embeddedPrice.priceChannelKey)
        resource.channel = {
          typeId: 'channel',
          key: embeddedPrice.priceChannelKey,
        }

      if (embeddedPrice.priceCustomerGroupKey)
        resource.customerGroup = {
          typeId: 'customer-group',
          key: embeddedPrice.priceCustomerGroupKey,
        }

      if (embeddedPrice.priceTierMinQty && embeddedPrice.tierPrice)
        resource.tiers = [
          {
            minimumQuantity: embeddedPrice.priceTierMinQty,
            value: {
              type: 'centPrecision',
              currencyCode: embeddedPrice.currency,
              centAmount: embeddedPrice.tierPrice,
              fractionDigits: 2,
            },
          },
        ]

      return resource
    })

    const responses: unknown[] = []

    // Slices of 20 due to Commercetools limit
    // https://docs.commercetools.com/import-export/price#embeddedpriceimportrequest
    let startIndex = 0
    const slice = 20
    while (true) {
      const endIndex = startIndex + slice <= resources.length ? startIndex + slice : resources.length - 1

      const slicedResources = resources.slice(startIndex, endIndex)
      const body = {
        type: 'price',
        resources: slicedResources,
      }

      const response = await fetch(
        `https://import.${environment.commercetools.region}.commercetools.com/${environment.commercetools.projectKey}/prices/import-containers/${importContainerKey}`,
        { method: 'POST', headers, body: JSON.stringify(body) },
      )

      const json = await response.json()
      responses.push(json)

      startIndex += slice
      if (startIndex > resources.length) break
    }

    return responses
  },
}
