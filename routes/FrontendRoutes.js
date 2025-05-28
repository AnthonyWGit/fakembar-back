import express from 'express';
const router = express.Router();
import frontendController from '../controllers/FrontendController.js';
import staticController from '../controllers/StaticController.js';

// Static HTML Routes
router.get('/jokes', staticController.serveBlagues);
router.get('/', staticController.serveIndex);

// Dynamic Routes
router.get('/jokeUnique', frontendController.showJokeSelection);
router.get('/jokeUnique/:jokeId', frontendController.showSelectedJoke);
router.get('/home', frontendController.home);

export default router;