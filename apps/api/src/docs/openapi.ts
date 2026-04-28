export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'karigai API',
    version: '0.1.0'
  },
  paths: {
    '/v1/health/sync': {
      post: {
        summary: 'Sync user health data from authorized integrations'
      }
    },
    '/v1/admin/safety-flags': {
      get: {
        summary: 'Read safety flag queue for admin review'
      }
    }
  }
} as const;
