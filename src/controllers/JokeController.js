  import Joke from '../models/Joke.js';

  //helper func for escaping, should be placed in a utils folder
  const basicHtmlEscape = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, 
    char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]
  );
};

  export default {
    /**
     * @swagger
     * tags:
     *   name: Jokes
     *   description: Joke management endpoints
     */
    
    
    /**
     * Get all jokes
     * @async
     */

    getAllJokes: async (req, res) => {
      try {
        const jokes = await Joke.getAll();
        res.status(200).json(jokes);
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des blagues' });
      }
    },

    /**
     * Get a specific joke ID
     * @async
     */

    getJokeById: async (req, res) => {
      try {
        const joke = await Joke.getById(req.params.id);
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

        text = basicHtmlEscape(text.trim());
        answer = basicHtmlEscape(text.trim());
        const newJoke = await Joke.createJoke({ text, answer });
        res.status(201).json(newJoke);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    
    /**
     * Get a random joke
     * @async
     */

    getRandomJoke: async (req, res) => {
      try {
        const randomJoke = await Joke.getRandom();

        if (!randomJoke) {
          return res.status(404).json({ error: "Aucune blague trouvée" });
        }

        res.json(randomJoke);
      } catch (error) {
        console.error('ERREUR:', error);
        res.status(500).json({ 
          error: 'Erreur serveur',
          details: error.message
        });
      }
    },

      /**
     * Get all and count how many entries are in table
     * @async
     */

  count: async (req, res) => {
    try {
      const total = await Joke.count();
      
      // Always returns a number (even if 0), so no need for !total check
      res.json({ count: total });
    } catch (error) {
      console.error('ERREUR:', error);
      res.status(500).json({ 
        error: 'Erreur serveur',
        details: error.message
      });
    }
  }
  };