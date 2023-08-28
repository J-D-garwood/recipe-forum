const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  //seeding the database with users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //seeding the database with recipes
  const recipes = await Recipe.bulkCreate(recipeData);
  process.exit(0);
};

seedDatabase();
