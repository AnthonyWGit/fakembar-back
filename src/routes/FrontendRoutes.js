import express from 'express';
const router = express.Router();
import frontendController from '../controllers/FrontendController.js';
import staticController from '../controllers/StaticController.js';

// Static HTML Routes

// router.get('/random', (req, res) => res.render('templates/jokeRandom'));

// Dynamic Routes
router.get('/jokeRandom', frontendController.showRandomPage);
router.get('/jokes',frontendController.allJokesPage);
router.get('/jokeUnique', frontendController.showJokeSelectionPage);
router.get('/jokeUnique/:jokeId', frontendController.showSelectedJokePage);
router.get('/home', frontendController.home);

// Redirect
router.get('/', frontendController.redirectToHome);

// Catch-all for 404
router.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

export default router;