import { createClient as createDeliveryClient } from 'contentful'
import { createClient } from 'contentful-management'
import { environment } from '../environment'

export const contentfulClient = createClient({
  accessToken: environment.contentful.cmaToken,
})

export const contentfulDeliveryClient = createDeliveryClient({
  accessToken:
    environment.contentful.mode === 'delivery'
      ? environment.contentful.deliveryToken
      : environment.contentful.previewToken,
  host: environment.contentful.mode === 'delivery' ? 'cdn.contentful.com' : 'preview.contentful.com',
  space: environment.contentful.spaceId,
  environment: environment.contentful.env,
})
