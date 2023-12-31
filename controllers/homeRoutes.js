const router = require('express').Router();
const { Recipe, User, Comment, UserFavoriteRecipe } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const upload = require('../utils/upload');
const { stringify } = require('uuid');
router.get('/', async (req, res) => {
  try {
    const RecipeData = await Recipe.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const recipes = RecipeData.map((recipe) => recipe.get({ plain: true }));

    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET route to return all the details related to a recipe by it's id
router.get('/recipe/:id', withAuth, async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(404).render('404');
    }
    const dbRecipeData = await Recipe.findByPk(req.params.id, {
      include: [{ model: User, through: UserFavoriteRecipe }],
      attributes: {
        include: [
          [
            //  plain SQL to get total number of likes for the recipe by passing id
            sequelize.literal(
              `(SELECT COUNT(*) FROM userfavoriterecipe WHERE  userfavoriterecipe.recipe_id=${req.params.id})`
            ),
            'likes',
          ],
          [
            //  plain SQL which returns 1 if the logged in user liked the recipe and 0 if not.
            sequelize.literal(
              `(SELECT COUNT(*) FROM userfavoriterecipe WHERE  userfavoriterecipe.recipe_id=${req.params.id} AND userfavoriterecipe.user_id=${req.session.userId})`
            ),
            'liked',
          ],
        ],
      },
      include: [
        //to get the name of the user who posted the recipe
        {
          model: User,
          attributes: ['name'],
        },
        {
          //to get all the comments related to the recipe including the names of the users who commented
          model: Comment,
          attributes: ['dateCreated', 'comment'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    req.session.recipeId = req.params.id;
    if (!dbRecipeData) {
      return res.status(404).render('404');
    }
    const recipe = dbRecipeData.get({ plain: true });
    //to show the like button on handlebars as clicked or not
    if (recipe.liked === 1) {
      req.session.Liked = true;
    } else {
      req.session.Liked = false;
    }
    if (recipe.userId==req.session.userId) {
      isAuthored = true;
    } else {
      isAuthored = false;
    }
    res.render('recipe-details', {
      recipe,
      recipeId: req.session.recipeId,
      userId: req.session.userId,
      logged_in: req.session.logged_in,
      Liked: req.session.Liked,
      isAuthored,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).render('500');
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userWithFavouritesData = await User.findByPk(req.session.userId, {
      attributes: ['name'],
      include: [
        { model: Recipe, through: UserFavoriteRecipe, as: 'user_recipes' },
      ],
    });

    const favourites = userWithFavouritesData.user_recipes.map((fav) =>
      fav.get({ plain: true })
    );
    const createdRecipesData = await Recipe.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const createdRecipes = createdRecipesData.map((recipe) =>
      recipe.get({ plain: true })
    );

    res.render('profile', {
      createdRecipes,
      favourites,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

/*
    const recipeData = await Recipe.findAll({

      //include: [{ model: User }],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: {
        userId: req.session.userId
      },
    });
    const recipe = recipeData.get({ plain: true });
    res.render('profile', {
      ...recipe,
      logged_in: true,
    });
    /*
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
      where: {
        userId: req.session.userId,
      },
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      user,
      logged_in: true,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Create a new entry to the table userfavoriterecipe if the recipe is already not liked,otherwise delete the entry
router.post('/recipe/like', withAuth, async (req, res) => {
  try {
    let [dbFavoriteRecipeData, created] = await UserFavoriteRecipe.findOrCreate(
      {
        where: { recipeId: req.body.id, userId: req.session.userId },
      }
    );

    if (!created) {
      dbFavoriteRecipeData = await UserFavoriteRecipe.destroy({
        where: { recipeId: req.body.id, userId: req.session.userId },
      });
      res.status(200).json({ liked: 0 });
    } else {
      res.status(201).json({ liked: 1 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//save the recipe / add a new recipe
router.post('/upload', withAuth, upload.single('file'), async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const dbRecipeData = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      imagePath: '/images/uploads/' + req.file.filename,
      userId: req.session.userId,
    });
    if (dbRecipeData) {
      // redirect the user to the page of the recipe that just added
      res.redirect(`/recipe/${dbRecipeData.id}`);
    }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
});
router.get('/addnewrecipe', withAuth, async (req, res) => {
  try {
    res.render('addnewrecipe', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('*', (req, res) => {
  res.status(404).render('404');
});
module.exports = router;
