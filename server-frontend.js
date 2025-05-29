import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendApp = express();

// Security headers
frontendApp.disable('x-powered-by');

// Configure views
frontendApp.set('view engine', 'pug');
frontendApp.set('views', path.join(__dirname, 'views'));

// Block direct access to Pug source files
frontendApp.use((req, res, next) => {
  if (req.path.endsWith('.pug')) {
    return res.status(403).send('Access forbidden');
  }
  next();
});

// Serve static assets
frontendApp.use('/public', express.static(path.join(__dirname, 'public')));

// Render routes
frontendApp.get('/', (req, res) => res.render('templates/home'));
frontendApp.get('/jokes', (req, res) => res.render('templates/allJokes'));
frontendApp.get('/random', (req, res) => res.render('templates/jokeUnique'));

// Catch-all for 404
frontendApp.use((req, res) => {
  res.status(404).render('templates/error', { message: 'Page not found' });
});

// Start server
const PORT = process.env.FRONTEND_PORT || 8080;
frontendApp.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});