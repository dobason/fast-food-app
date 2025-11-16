module.exports = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Payment Service API',
      description: 'API documentation for the Payment Service'
    },
    host: `localhost:${process.env.PORT}`,
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".'
      }
    }
  },
  apis: ['./src/routes/*.js']
};
