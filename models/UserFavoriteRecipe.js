const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class userFavoriteRecipe extends Model {}

userFavoriteRecipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'User',
              key: 'id',
            },
          },
        recipeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Recipe',
                key: 'id',
              },
        },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'userFavoriteRecipe'
    }
)

module.exports = userFavoriteRecipe;