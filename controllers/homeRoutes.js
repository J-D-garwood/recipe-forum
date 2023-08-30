const router = require('express').Router();
const { Recipe, User, Comment, UserFavoriteRecipe } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    const RecipeData = await Recipe.findAll({
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
    const recipe = dbRecipeData.get({ plain: true });
    //to show the like button on handlebars as clicked or not
    if (recipe.liked === 1) {
      req.session.Liked = true;
    } else {
      req.session.Liked = false;
    }
    res.render('recipe-details', {
      recipe,
      recipeId: req.session.recipeId,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      Liked: req.session.Liked,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Create a new entry to the table userfavoriterecipe if the recipe is already not liked,otherwise delete the entry
router.post('/recipe/like', async (req, res) => {
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
      res.status(204).json(dbFavoriteRecipeData);
    } else {
      res.status(201).json(dbFavoriteRecipeData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/upload', upload.single('file'), async (req, res) => {
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
module.exports = router;
