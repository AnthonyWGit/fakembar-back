import JokeModel from '../models/Joke.js';

export default {
  home: async (req, res) => {
    return res.render('home', {});
  },

  // Redirect root to /home
  redirectToHome : async(req,res) => {
    return res.redirect('/home');
  },
  
  showJokeSelection: async (req, res) => {
    try {
      const jokes = await JokeModel.findAll();
      
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
      const jokes = await JokeModel.findAll();
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