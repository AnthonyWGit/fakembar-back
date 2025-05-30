import Joke from '../models/Joke.js';

export default {
  home: async (req, res) => {
    return res.render('home', {});
  },

  redirectToHome: async (req, res) => {
    return res.redirect('/home');
  },
  
  allJokesPage: async (req, res) => {
    try {
      const jokes = await Joke.getAll();
      res.render('jokes', { jokes });
    } catch (error) {
      console.error('Error fetching jokes:', error);
      res.status(500).render('error', { message: 'Server Error' });
    }
  },

  showRandomPage: async (req, res) => {
    try {
      const randomJoke = await Joke.getRandom();
      res.render('jokeRandom', { joke: randomJoke });
    } catch (error) {
      console.error('Error fetching random joke:', error);
      res.status(500).render('error', { message: 'Server Error' });
    }
  },

  showJokeSelectionPage: async (req, res) => {
    try {
      const jokes = await Joke.getAll();
      
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

  showSelectedJokePage: async (req, res) => {
    try {
      const jokes = await Joke.getAll();
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