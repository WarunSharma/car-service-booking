import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Car User Service API',
    version: '1.0.0',
    description: 'API for managing user service',
  },
  servers: [
    {
      url: 'http://localhost:4002/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [process.env.NODE_ENV === 'production' ? './dist/routes/*.js': './src/routes/*.ts'], // 👈 Where to look for JSDoc comments
};

export default swaggerJSDoc(options);
