// import models
const User = require('./User');
const Recipe = require('./Recipe');
const Comment = require('./Comment');
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
});

// Recipe belongToMany User (through UserFavoriteRecipe)
Recipe.belongsToMany(User, {
  through: UserFavoriteRecipe,
});

// Comment belongs to Recipe
Comment.belongsTo(Recipe, {
  foreignKey: 'recipeId',
});

// Recipe can have many Comments
Recipe.hasMany(Comment, {
  foreignKey: 'recipeId',
  onDelete: 'CASCADE',
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'userId',
});

// User can have many Comments
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = { User, Recipe, UserFavoriteRecipe };
