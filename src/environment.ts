export const environment = {
  contentful: {
    cma: process.env.CONTENTFUL_CMA ?? '',
    spaceId: process.env.CONTENTFUL_SPACE ?? '',
    env: process.env.CONTENTFUL_ENV ?? 'dev',
    locale: process.env.CONTENTFUL_LOCALE ?? 'en-US',
    contentType: process.env.CONTENTFUL_CONTENT_TYPE ?? '',
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
  },
}
