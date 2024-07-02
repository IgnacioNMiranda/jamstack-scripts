import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import {
  ClientBuilder,
  HttpMiddlewareOptions,
  createAuthWithExistingToken,
} from '@commercetools/sdk-client-v2'
import { environment } from '../environment'

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${environment.commercetools.region}.commercetools.com`,
  fetch,
}

const ctpClient = new ClientBuilder()
  .withAuthMiddleware(createAuthWithExistingToken(`Bearer ${environment.commercetools.token}`))
  .withHttpMiddleware(httpMiddlewareOptions)
  .build()

export const commercetoolsClient = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: environment.commercetools.projectKey,
})
