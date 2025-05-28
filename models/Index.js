// models/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.js'; // Centralized connection

// Get current module path (replaces __dirname/__filename)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

// Load models
const files = fs.readdirSync(__dirname).filter(file => (
  file !== basename &&
  file.endsWith('.js') &&
  !file.includes('.test.js')
));

// Async model loading (using dynamic imports)
await Promise.all(files.map(async (file) => {
  const modulePath = `./${file}`;
  
  // Dynamic ES module import
  const modelModule = await import(modulePath);
  
  // Initialize model (default export)
  const model = modelModule.default(sequelize, sequelize.DataTypes);
  db[model.name] = model;
}));

// Configure associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;

export default db;