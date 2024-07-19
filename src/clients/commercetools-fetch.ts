// Client for endpoints that have not been implemented in normal Commercetools Client yet

import { environment } from '../environment'
import { EmbeddedPrices } from '../types/prices/embedded-prices'
import { EmbeddedPriceImport } from '../types/prices/price-import'

export const commercetoolsClientFetch = {
  importEmbeddedPrices: async ({ data }: EmbeddedPrices) => {
    const headers = new Headers({
      Authorization: `Bearer ${environment.commercetools.token}`,
    })

    const resources: EmbeddedPriceImport[] = data.map((embeddedPrice) => {
      const resource: EmbeddedPriceImport = {
        country: embeddedPrice.country,
        productVariant: {
          typeId: 'product-variant',
          key: embeddedPrice.sku,
        },
        product: {
          typeId: 'product',
          key: embeddedPrice.productId,
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

      if (embeddedPrice.priceKey) resource.key = embeddedPrice.priceKey

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
    let startIndex = 0
    const slice = 1
    while (true) {
      const endIndex =
        startIndex + slice <= resources.length ? startIndex + slice : resources.length - 1

      const slicedResources = resources.slice(startIndex, endIndex)
      const body = {
        type: 'price',
        resources: slicedResources,
      }

      const response = await fetch(
        `https://import.${environment.commercetools.region}.commercetools.com/${environment.commercetools.projectKey}/prices/import-containers/embedded-prices-import-container`,
        { method: 'POST', headers, body: JSON.stringify(body) },
      )

      const json = await response.json()
      responses.push(json)

      startIndex += slice
      if (startIndex > resources.length) break
    }

    return JSON.stringify(responses)
  },
}
