// import models
const User = require('./User');
const Recipe = require('./Recipe');

// Recipe belongs to User
Recipe.belongsTo(User, {
  foreignKey: 'userId',
});
// Users can have many Recipes
User.hasMany(Recipe, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = { User, Recipe };
