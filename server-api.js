import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import jokeRoutes from './src/routes/jokeRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const apiApp = express();

// Middleware
apiApp.use(express.json());

// Swagger documentation
apiApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS configuration - allow all origins for simplicity
apiApp.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// API routes
apiApp.use('/api/v1/jokes', jokeRoutes);

// SQLite database setup
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    apiApp.listen(PORT, '0.0.0.0', () => {
      console.log(`API Server running on port ${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
      
      // Initial data seeding
      if (process.env.SEED_DATA === 'true') {
        require('./seeders/seed-jokes.js')();
      }
    });
  })
  .catch(console.error);