import db from '../models/Index.js';
const { Joke } = db;
import sequelize from '../config/database.js';

export default {
  /**
   * @swagger
   * tags:
   *   name: Jokes
   *   description: Joke management endpoints
   */
  
  // ... existing methods with enhanced comments ...

  /**
   * Get all jokes
   * @async
   */
  getAllJokes: async (req, res) => {
    try {
      const jokes = await Joke.findAll();
      res.status(200).json(jokes);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des blagues' });
    }
  },

  /**
   * Get a random joke
   * @async
   */
  getJokeById: async (req, res) => {
    try {
      const joke = await Joke.findByPk(req.params.id);
      if (!joke) {
        return res.status(404).json({ error: 'Blague non trouvée' });
      }
      res.status(200).json(joke);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * Add a joke
   * @async
   */
  addJoke: async (req, res) => {
    try {
      const { text, answer } = req.body;
      
      if (!text || !answer) {
        return res.status(400).json({ error: 'Text et answer sont requis' });
      }

      const newJoke = await Joke.create({
        text,
        answer
      });

      res.status(201).json(newJoke);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getRandomJoke: async (req, res) => {
    try {
      const randomJoke = await Joke.findOne({
        order: sequelize.literal('RANDOM()')
      });

      if (!randomJoke) {
        return res.status(404).json({ error: "Aucune blague trouvée" });
      }

      res.json(randomJoke);

    } catch (error) {
      console.error('ERREUR SQL:', error.parent?.sql);
      res.status(500).json({ 
        error: error.message,
        sqlError: error.parent?.sql 
      });
    }
  }
};