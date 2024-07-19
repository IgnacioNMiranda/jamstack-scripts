export type RawEmbeddedPrice = {
  SKU: string
  PriceKey?: string
  Price: string
  Currency: string
  Country: string
  PriceTierMinQty?: string
  TierPrice?: string
  PriceCustomerGroupKey?: string
  PriceChannelKey?: string
}

export type EmbeddedPrice = {
  productId: string
  sku: string
  priceKey?: string
  // Cent Amount
  price: number
  country: string
  currency: string
  priceTierMinQty?: number
  // Cent Amount
  tierPrice?: number
  priceCustomerGroupKey?: string
  priceChannelKey?: string
}

export type EmbeddedPrices = {
  data: Array<EmbeddedPrice>
}
