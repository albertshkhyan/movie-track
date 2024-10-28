/* eslint-disable @typescript-eslint/no-require-imports */
const next = require('next');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });
// console.log('process.env: ', process.env);

// Determine if in development mode
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Define constants from environment variables
const API_URL = process.env.BASE_URL || 'http://localhost:3001';
const PORT = process.env.API_PORT || 3001;

// Load Swagger documentation
const swaggerDocument = YAML.load(
  path.join(__dirname, 'src/docs/swagger.yaml')
);

// Prepare Next.js app and start the server
app.prepare().then(() => {
  const server = express();

  // Configure CORS with origin based on environment
  server.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.PRODUCTION_ORIGIN
          : '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    })
  );

  // Set up Swagger documentation route
  const swaggerDocument = YAML.load(
    path.join(__dirname, 'src/docs/swagger.yaml')
  );
  swaggerDocument.servers = [
    {
      url: process.env.BASE_URL + '/api',
      description: 'Production Server',
    },
  ];
  server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Define sample route for health check
  server.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => handle(req, res));

  // Start the server
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(
      `> Server running in ${process.env.NODE_ENV} mode on ${API_URL}`
    );
    console.log(`> Swagger UI available at ${API_URL}/api/docs`);
  });
});
