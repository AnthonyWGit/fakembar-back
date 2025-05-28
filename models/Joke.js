import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Import the shared instance

const Joke = sequelize.define('Joke', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'jokes'
});

// Associations would be defined here if you had relationships
// Joke.associate = function(models) { ... };

export default Joke;