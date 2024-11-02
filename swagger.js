import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import fs from 'fs';

const app = express();

const doc = {
  info: {
    title: 'Backend Chat',
    description: 'Projeto de Chat em Tempo Real',
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./src/server.ts'];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  const swaggerFile = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));

  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.listen(3000, () => {
    console.log('Swagger Docs available at http://localhost:3000/api-docs');
  });
});