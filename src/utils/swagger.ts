const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: `HRMS API's docs`,
    description: `description here...`,
  },
  host: 'localhost:3000',
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['../index.ts'];

swaggerAutogen(outputFile, routes, doc, );