import { createClient } from 'contentful-management'
import { environment } from '../environment'

export const contentfulClient = createClient({
  accessToken: environment.contentful.cma,
})
