// swagger.config.js
module.exports = { // Use module.exports
  definition: { //<- aqui era definição
    openapi: '3.0.0',
    info: {
      title: 'API Chat Backend',
      version: '1.0.0',
      description: 'API para autenticação e chat em tempo real',
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Array de strings

};