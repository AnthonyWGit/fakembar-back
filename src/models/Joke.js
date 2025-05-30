import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js'; 

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
  tableName: 'Jokes'
});

// Add custom methods to the model
Joke.getRandom = async function() {
  return this.findOne({
    order: sequelize.literal('RANDOM()')
  });
};

Joke.getAll = async function() {
  return this.findAll();
};

Joke.getById = async function(id) {
  return this.findByPk(id);
};

Joke.createJoke = async function({ text, answer }) {
  return this.create({ text, answer });
};

export default Joke;