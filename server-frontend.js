import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import frontendRoutes from './src/routes/FrontendRoutes.js'; // MUST ADD THIS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendApp = express();

// Security headers
frontendApp.disable('x-powered-by');

// Configure views
frontendApp.set('view engine', 'pug');
frontendApp.set('views', [
    path.join(__dirname, 'views'),          // First looks in root views
    path.join(__dirname, 'views/templates') // Then looks in templates
]);

// Block direct access to Pug source files
frontendApp.use((req, res, next) => {
  if (req.path.endsWith('.pug')) {
    return res.status(403).send('Access forbidden');
  }
  next();
});

// Serve static assets
frontendApp.use('/public', express.static(path.join(__dirname, 'public')));

// MOUNT ROUTES FIRST (CRITICAL FIX)
frontendApp.use(frontendRoutes);

// Start server
const PORT = process.env.FRONTEND_PORT || 8080;
frontendApp.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});