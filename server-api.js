import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize, { testConnection } from './config/database.js';
import jokeRoutes from './src/routes/jokeRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const apiApp = express();
const PORT = process.env.PORT || 10000;

// Middleware
apiApp.use(express.json());

// CORS configuration
apiApp.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// API routes
apiApp.use('/api/v1/jokes', jokeRoutes);

// Swagger documentation
apiApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
// apiApp.get('/health', (req, res) => {
//   res.status(200).json({ status: 'UP' });
// });

// Start server only after DB connection
const startServer = async () => {
  try {
    // Test DB connection
    const isConnected = await testConnection();
    if (!isConnected) throw new Error('Database connection failed');
    
    // Sync models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development'});
    console.log('Database models synchronized');
    
    // Start server
    apiApp.listen(PORT, '0.0.0.0', () => {
      console.log(`API Server running on port ${PORT}`);
      
      // Seed data if needed
      if (process.env.SEED_DATA === 'true') {
        import('./seeders/seed-jokes.js')
          .then(module => module.default())
          .catch(err => console.error('Seeding failed:', err));
      }
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();