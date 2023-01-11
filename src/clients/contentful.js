import contentful from 'contentful-management'
import { environment } from '../environment'

export const contentfulClient = contentful.createClient({
  accessToken: environment.contentful.cma,
})
