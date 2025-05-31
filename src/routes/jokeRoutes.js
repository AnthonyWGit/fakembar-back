import express from 'express';
const router = express.Router();
import controller from '../controllers/JokeController.js';

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Get a random joke
 *     description: Retrieves a random joke from the database
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: No jokes found
 *       500:
 *         description: Server error
 */
router.get('/random', controller.getRandomJoke);

/**
 * @swagger
 * /jokes/all:
 *   get:
 *     summary: Get all jokes
 *     description: Retrieves all jokes from the database
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Array of joke objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Server error
 */
router.get('/all', controller.getAllJokes);

/**
 * @swagger
 * /jokes/add:
 *   post:
 *     summary: Add a new joke
 *     description: Creates a new joke in the database
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - answer
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Why did the chicken cross the road?"
 *               answer:
 *                 type: string
 *                 example: "To get to the other side!"
 *     responses:
 *       201:
 *         description: The created joke object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/add', controller.addJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     description: Retrieves a specific joke by its ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the joke to retrieve
 *     responses:
 *       200:
 *         description: The requested joke
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getJokeById);

/**
 * @swagger
 * /jokes/countall:
 *   get:
 *     summary: Count all the jokes
 *     description: retrieve an integer representing the number of entries in the table joke 
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Integer representing the number of jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Server error
 */
router.get('/countAll', controller.count);

export default router;
