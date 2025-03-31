export const environment = {
  contentful: {
    cmaToken: process.env.CONTENTFUL_CMA_TOKEN ?? '',
    deliveryToken: process.env.CONTENTFUL_CDA_TOKEN ?? '',
    previewToken: process.env.CONTENTFUL_CPA_TOKEN ?? '',
    mode: process.env.CONTENTFUL_MODE ?? 'preview',
    spaceId: process.env.CONTENTFUL_SPACE ?? '',
    env: process.env.CONTENTFUL_ENV ?? 'dev',
    locale: process.env.CONTENTFUL_LOCALE ?? 'en-US',
    contentType: process.env.CONTENTFUL_CONTENT_TYPE ?? '',
  },
  bluestone: {
    clientId: process.env.BLUESTONE_CLIENT_ID ?? '',
    clientSecret: process.env.BLUESTONE_CLIENT_SECRET ?? '',
    authUrl: process.env.BLUESTONE_AUTH_URL ?? 'https://idp.test.bluestonepim.com/op/token',
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID ?? '',
    apiKey: process.env.ALGOLIA_API_KEY ?? '',
    index: process.env.ALGOLIA_INDEX ?? '',
  },
  stytch: {
    projectId: process.env.STYTCH_PROJECT_ID ?? '',
    secret: process.env.STYTCH_SECRET ?? '',
  },
  vercel: {
    token: process.env.VERCEL_TOKEN ?? '',
    projectId: process.env.VERCEL_PROJECT_ID ?? '',
  },
  conscia: {
    token: process.env.CONSCIA_TOKEN ?? '',
    customerCode: process.env.CONSCIA_CUSTOMER_CODE ?? '',
    environmentCode: process.env.CONSCIA_ENVIRONMENT_CODE ?? 'preview',
    isStaging: process.env.CONSCIA_ENV === 'staging',
    isProd: process.env.CONSCIA_ENV === 'production',
  },
  commercetools: {
    clientId: process.env.COMMERCETOOLS_CLIENT_ID ?? '',
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET ?? '',
    projectKey: process.env.COMMERCETOOLS_PROJECT_KEY ?? '',
    region: process.env.COMMERCETOOLS_REGION ?? '',
    token: process.env.COMMERCETOOLS_TOKEN ?? '',
  },
}
