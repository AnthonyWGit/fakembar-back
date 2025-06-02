import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Create Sequelize instance without immediate connection
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: './database/database.sqlite',
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
});

// Test connection only when explicitly called
// https://sequelize.org/docs/v6/getting-started/
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

export default sequelize;