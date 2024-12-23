const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");
const config = require("./config");

const app = express();
// Middleware
app.use(bodyParser.json());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health
 *     description: Returns the health status of the API.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
app.get('/api/health', (req, res) => res.status(200).send({ status: 'OK' }));

const catFacts = [
  "Cats sleep for 70% of their lives.",
  "A group of cats is called a clowder.",
  "The oldest cat ever lived to be 38 years old.",
  "Cats can't taste sweetness.",
];

// /**
//  * @swagger
//  * /secret-cat-fact:
//  *   get:
//  *     summary: Get a random cat fact (secret endpoint)
//  *     responses:
//  *       200:
//  *         description: A random cat fact
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 fact:
//  *                   type: string
//  *                   example: Cats sleep for 70% of their lives.
//  */
app.get("/secret-cat-fact", (req, res) => {
  const randomIndex = Math.floor(Math.random() * catFacts.length);
  const fact = catFacts[randomIndex];
  res.status(200).json({ fact });
});
const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
  "Why do Java developers wear glasses? Because they can't C#.",
  "There are only 10 kinds of people in this world: those who understand binary and those who don't.",
];

// Generate a random joke
// /**
//  * @swagger
//  * /joke:
//  *   get:
//  *     summary: Get a random programming joke
//  *     responses:
//  *       200:
//  *         description: A random joke
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 joke:
//  *                   type: string
//  *                   example: Why do programmers prefer dark mode? Because light attracts bugs!
//  */
app.get("/joke", (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const joke = jokes[randomIndex];
  res.status(200).json({ joke });
});
app.get("/easter-egg", (req, res) => {
  console.log("Someone accessed the hidden endpoint!");
  res.status(200).json({ 
      message: "You found the easter egg! 🐣" 
  });
});
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get homepage
 *     description: Serves the main HTML page for the application.
 *     responses:
 *       200:
 *         description: HTML file loaded
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<!DOCTYPE html>..."
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

console.log(`Server base URL is: ${config.baseUrl}`);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${config.baseUrl}`);
});

// `Server running on http://localhost:${PORT}`