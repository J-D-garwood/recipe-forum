const router = require('express').Router();

// Import routers

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

const recipeRoutes = require('./recipeRoutes');

router.use('/recipes', recipeRoutes);

module.exports = router;
