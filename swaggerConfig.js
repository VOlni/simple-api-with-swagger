const swaggerJsDoc = require("swagger-jsdoc");
const config = require("./config");

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple User Management API",
      version: "1.0.0",
      description: "A simple API for managing users",
    },
    servers: [
      {
        url: config.baseUrl,
      },
    ],
  },
  apis: ["./app.js", './routes/*.js'], // Path to your API documentation in JSDoc format
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;