import 'dotenv/config'; // Load environment variables first
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE_PATH || './database.sqlite',
  logging: process.env.DB_LOGGING === 'true' ? console.log : false
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('Connexion à SQLite réussie !'))
  .catch(err => console.error('Erreur de connexion :', err));

export default sequelize;