import express from 'express';
const router = express.Router();
import frontendController from '../controllers/FrontendController.js';
import staticController from '../controllers/StaticController.js';

// Static HTML Routes

router.get('/random', (req, res) => res.render('templates/jokeUnique'));

// Dynamic Routes
router.get('/jokes',frontendController.allJokesPage);
router.get('/jokeUnique', frontendController.showJokeSelection);
router.get('/jokeUnique/:jokeId', frontendController.showSelectedJoke);
router.get('/home', frontendController.home);

// Redirect
router.get('/', frontendController.redirectToHome);

// Catch-all for 404
router.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

export default router;