import { Product, ProductProjection, ProductUpdateAction } from '@commercetools/platform-sdk'
import { commercetoolsClient } from '../../clients/commercetools'
import { resolve } from 'path'
import getAllProducts from './get-all-products'
import { input } from '@inquirer/prompts'

export default async () => {
  const locale = await input({
    message: 'Enter the locale to be used:',
    default: 'en-US',
  })

  try {
    // Source products were already exported by running the get-all-products command prior to this command. Different Commercetools credentials might have been used.
    const productsPath = resolve(__dirname, '../../outputs/commercetools/get-all-products.json')
    const { default: sourceProducts } = await import(productsPath)

    const targetProducts = await getAllProducts()

    const updatedProducts: Product[] = []

    for (const targetProd of targetProducts) {
      const sourceProd = (sourceProducts as ProductProjection[]).find(
        (prod) => prod.slug[locale] === targetProd.slug[locale],
      )

      if (sourceProd) {
        const actions: ProductUpdateAction[] = []
        if (sourceProd.metaTitle && !targetProd.metaTitle)
          actions.push({ action: 'setMetaTitle', metaTitle: sourceProd.metaTitle })
        if (sourceProd.metaDescription && !targetProd.metaDescription)
          actions.push({
            action: 'setMetaDescription',
            metaDescription: sourceProd.metaDescription,
          })
        if (sourceProd.metaKeywords && !targetProd.metaKeywords)
          actions.push({ action: 'setMetaKeywords', metaKeywords: sourceProd.metaKeywords })

        if (actions.length) {
          const updatedProduct = await commercetoolsClient
            .products()
            .withId({ ID: targetProd.id })
            .post({
              body: {
                version: targetProd.version,
                actions,
              },
            })
            .execute()
          updatedProducts.push(updatedProduct.body)
        }
      }
    }
    return updatedProducts
  } catch (error) {
    console.log(error)
    return []
  }
}
