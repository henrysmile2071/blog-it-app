/**
 * Swagger definition configuration file
 *
 * @author Henry Chen
 *
 */
/* eslint max-len: ["error", { "ignoreComments": true, "ignoreStrings": true }] */
import swaggerJSDoc from 'swagger-jsdoc';

/**
 * @constant {object} swaggerDefinition - OpenAPI specification details
 */
const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Express API for simple blogging platform',
    version: '1.0.0',
    description: 'Simple blogging platform with register, login and creating/reading posts',
    contact: {
      name: 'Henry Chen',
      url: 'https://github.com/henrysmile2071/blog-it-app/',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

/**
 * @constant {object} options - object holding swaggerDefintion and apis paths required for JSDoc parsing
 */
const options = {
  definition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/routes/**/*.route.js'],
};

/**
 * @constant {object} swaggerSpec - swaggerJSDoc parsed specifications
 */
const swaggerSpec = swaggerJSDoc(options);

export {
  swaggerSpec,
};
