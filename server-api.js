// server-api.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import jokeRoutes from './routes/jokeRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js'; // Add this

const apiApp = express();

// Middleware
apiApp.use(express.json());

// Add Swagger middleware
apiApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

apiApp.use(cors({
  origin: process.env.FRONTEND_URL
}));

apiApp.use('/api/v1/jokes', jokeRoutes);

sequelize.sync()
  .then(() => {
    apiApp.listen(process.env.API_PORT, () => {
      console.log(`API Server running on port ${process.env.API_PORT}`);
      console.log(`Swagger UI: http://localhost:${process.env.API_PORT}/api-docs`);
    });
  })
  .catch(console.error);