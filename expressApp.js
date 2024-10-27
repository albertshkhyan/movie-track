/* eslint-disable */
// expressApp.js

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const path = require('path');

// Load Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, 'src/docs/swagger.yaml'));

// Create Express app
const server = express();

// Middleware configurations
server.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_ORIGIN // Restrict CORS in production
        : '*', // Allow all origins in development and testing
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
}));

// Swagger documentation route
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up routes and error handling if needed
// Example of a sample route (you can replace or expand as needed)
server.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Export the Express app (for testing and general usage)
module.exports = server;
