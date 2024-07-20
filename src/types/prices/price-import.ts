import { FieldContainer, PriceTier, TypedMoney } from '@commercetools/platform-sdk'

// https://docs.commercetools.com/import-export/price#ctp:import:type:PriceImport
export type EmbeddedPriceImport = {
  key: string
  country?: string
  validFrom?: string
  validUntil?: string
  customerGroup?: {
    typeId: 'customer-group'
    key: string
  }
  channel?: {
    typeId: 'channel'
    key: string
  }
  discounted?: {
    value: TypedMoney
    discount: {
      typeId: 'product-discount'
      key: string
    }
  }
  tiers?: PriceTier[]
  productVariant: {
    typeId: 'product-variant'
    key: string
  }
  product: {
    typeId: 'product'
    key: string
  }
  value: TypedMoney
  custom?: {
    type: {
      typeId: 'type'
      key: string
    }
    fields: FieldContainer
  }
}
