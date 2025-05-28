import { DataTypes } from 'sequelize';
//getters and setters don't need to be explicitely written with sequalize ORM
export default (sequelize) => {
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

  Joke.associate = function(models) {
    // associations can be defined here
    // Example: Joke.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Joke;
};