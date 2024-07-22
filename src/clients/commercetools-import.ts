import {
  ClientBuilder,
  createAuthForClientCredentialsFlow,
  createHttpClient,
} from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/importapi-sdk'
import { environment } from '../environment'

const authMiddlewareOptions = {
  host: `https://auth.${environment.commercetools.region}.commercetools.com`,
  projectKey: environment.commercetools.projectKey,
  credentials: {
    clientId: environment.commercetools.clientId,
    clientSecret: environment.commercetools.clientSecret,
  },
  fetch,
}

const httpMiddlewareOptions = {
  host: `https://import.${environment.commercetools.region}.commercetools.com`,
  fetch,
}

const client = new ClientBuilder()
  .withMiddleware(createAuthForClientCredentialsFlow(authMiddlewareOptions))
  .withMiddleware(createHttpClient(httpMiddlewareOptions))
  .withUserAgentMiddleware()
  .build()

export const commercetoolsImportClient = createApiBuilderFromCtpClient(client).withProjectKeyValue({
  projectKey: environment.commercetools.projectKey,
})
