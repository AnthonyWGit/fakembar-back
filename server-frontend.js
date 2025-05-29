import 'dotenv/config';
import express from 'express';
import sequelize from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import frontendRoutes from './routes/FrontendRoutes.js';
import os from 'os';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendApp = express();

// Security headers
frontendApp.disable('x-powered-by');

// Configure views to search in multiple directories
frontendApp.set('view engine', 'pug');
frontendApp.set('views', [
  path.join(__dirname, 'views'),               // First look in base views directory
  path.join(__dirname, 'views/templates')      // Then look in templates directory
]);

// Block direct access to Pug source files
frontendApp.use((req, res, next) => {
  if (req.path.endsWith('.pug')) {
    console.log(`Blocked access to Pug file: ${req.path}`);
    return res.status(403).send('Access forbidden');
  }
  next();
});

// Serve static assets
frontendApp.use('/public', express.static(path.join(__dirname, 'public/')));

// Use all frontend routes
frontendApp.use('/', frontendRoutes);

// Catch-all for 404
frontendApp.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// 👇 Add this helper function
function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

frontendApp.listen(process.env.FRONTEND_PORT, '0.0.0.0', () => {
  console.log(`Frontend server accessible at http://${getNetworkIP()}:${process.env.FRONTEND_PORT}`);
});

// sequelize.sync()
//   .then(() => {
//     express().listen(process.env.API_PORT, () => {
//       console.log(`Frontend Server running on port ${process.env.FRONTEND_PORT}`);
//     });
//   })
//   .catch(console.error);