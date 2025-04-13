import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Car Service Booking API',
    version: '1.0.0',
    description: 'API for managing car service appointments',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // 👈 Where to look for JSDoc comments
};

export default swaggerJSDoc(options);
