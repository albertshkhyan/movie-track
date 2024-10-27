/* eslint-disable @typescript-eslint/no-require-imports */

const YAML = require('yamljs');
const path = require('path');
require('dotenv').config();

const swaggerDocument = YAML.load(
  path.join(__dirname, 'src/docs/swagger.yaml')
);

// Replace the ports in the OpenAPI `servers` array with environment variables
swaggerDocument.servers = [
  {
    url: `http://localhost:${process.env.API_PORT}/api`, // API server URL
  },
  {
    url: `http://localhost:${process.env.SWAGGER_PORT}/api`, // Swagger UI server URL
  },
];

module.exports = swaggerDocument;
