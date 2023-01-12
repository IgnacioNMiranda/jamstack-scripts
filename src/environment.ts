export const environment = {
  contentful: {
    cma: process.env.CONTENTFUL_CMA ?? '',
    spaceId: process.env.CONTENTFUL_SPACE ?? '',
    env: process.env.CONTENTFUL_ENV ?? 'dev',
    contentType: process.env.CONTENTFUL_CONTENT_TYPE ?? '',
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID ?? '',
    apiKey: process.env.ALGOLIA_API_KEY ?? '',
    index: process.env.ALGOLIA_INDEX ?? '',
  },
}
