import { resolve } from 'node:path'
import type { ProductProjection } from '@commercetools/platform-sdk'
import { commercetoolsClient } from '../../clients/commercetools'

type ReviewDraft = {
  title: string
  text: string
  rating: number | string
  authorName: string
  target: string // Product SKU
}
type ReviewsData = {
  reviews: ReviewDraft[]
}

// Assuming the Commercetools project has a state with key 'pending-approval'.
// Update this based on your use case.
const UNPUBLISHED_COMMERCETOOLS_STATE_KEY = 'pending-approval'

export default async () => {
  const fullPath = resolve(__dirname, '../../data/commercetools/draft-reviews.json')
  const reviewsData = (await import(fullPath)) as unknown as ReviewsData

  const matchingProductsList: ProductProjection[] = []

  const chunkSize = 20
  for (let i = 0; i <= reviewsData.reviews.length; i += chunkSize) {
    const chunk = reviewsData.reviews.slice(i, chunkSize)
    const skus = chunk.map(review => `"${review.target}"`)

    try {
      const matchingProducts = await commercetoolsClient
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: `variants.sku:${skus.join(',')}`,
          },
        })
        .execute()
      matchingProductsList.push(...matchingProducts.body.results)
    } catch (error) {
      const err = error as { message: string }
      console.error(`Error fetching products: ${err?.message ?? JSON.stringify(error)}`)
    }
  }

  if (!matchingProductsList.length) {
    console.error('No matching products were found for the provided Reviews.')
    return
  }

  const createdReviewIds: string[] = []
  for (const review of reviewsData.reviews) {
    const product = matchingProductsList.find(prod => {
      const variants = [prod.masterVariant, ...prod.variants]
      return variants.some(vari => vari.sku === review.target)
    })
    if (!product) {
      console.log(`'${review.title}' by "${review.authorName}" could not be created. No matching product found.`)
      continue
    }
    try {
      const newReview = await commercetoolsClient
        .reviews()
        .post({
          body: {
            title: review.title,
            text: review.text,
            rating: typeof review.rating === 'string' ? Number.parseInt(review.rating) : review.rating,
            authorName: review.authorName,
            target: {
              typeId: 'product',
              id: product.id,
            },
            state: {
              typeId: 'state',
              key: UNPUBLISHED_COMMERCETOOLS_STATE_KEY,
            },
          },
        })
        .execute()
      createdReviewIds.push(newReview.body.id)
    } catch (error) {
      console.error(error)
    }
  }

  return createdReviewIds
}
