// import models
const User = require('./User');
const Recipe = require('./Recipe');
const UserFavoriteRecipe = require('./UserFavoriteRecipe');

// Recipe belongs to User
Recipe.belongsTo(User, {
  foreignKey: 'userId',
});
// Users can have many Recipes
User.hasMany(Recipe, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
// User belongToMany Recipe (through UserFavoriteRecipe)
User.belongsToMany(Recipe, { 
  through: UserFavoriteRecipe,
  foreignKey: 'userId',
 });

// Recipe belongToMany User (through UserFavoriteRecipe)
Recipe.belongsToMany(User, {
  through: UserFavoriteRecipe,
  foreignKey: 'recipeId',
})

module.exports = { User, Recipe };
