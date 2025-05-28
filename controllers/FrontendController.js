import db from '../models/Index.js';
const { Joke } = db;

export default {
  home: async (req, res) => {
    return res.render('home',{});
  },

  showJokeSelection: async (req, res) => {
    try {
      const jokes = await Joke.findAll();
      
      if (req.query.jokeId) {
        return res.redirect(`/jokeUnique/${req.query.jokeId}`);
      }

      res.render('jokeUnique', {
        jokes,
        selectedJokeId: null,
        selectedAnswer: ''
      });
    } catch (error) {
      console.error('Error fetching jokes:', error);
      res.status(500).render('error', { message: 'Server Error' });
    }
  },

  showSelectedJoke: async (req, res) => {
    try {
      const jokes = await Joke.findAll();
      const selectedJokeId = req.params.jokeId;
      let selectedAnswer = '';
      
      if (selectedJokeId) {
        const selectedJoke = jokes.find(joke => joke.id == selectedJokeId);
        selectedAnswer = selectedJoke?.answer || 'No answer available';
      }

      res.render('jokeUnique', {
        jokes,
        selectedJokeId,
        selectedAnswer
      });
    } catch (error) {
      console.error('Error fetching jokes:', error);
      res.status(500).render('error', { message: 'Server Error' });
    }
  }
};