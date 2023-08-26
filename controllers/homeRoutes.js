const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

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

//GET route to return the recipe by id
router.get('/recipe/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Recipe.findByPk(req.params.id, {
      include: [{ model: User, through: UserFavoriteRecipe }],
      attributes: {
        include: [
          [
            //  plain SQL to get a count of likes for the recipe
            sequelize.literal(
              `(SELECT COUNT(*) FROM userfavoriterecipe where  userfavoriterecipe.recipe_id=${req.params.id})`
            ),
            'likes',
          ],
        ],
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
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
    const recipe = dbBlogData.get({ plain: true });
    fs.writeFileSync(
      __dirname + '/public/images/' + recipe.title,
      recipe.photo
    );
    console.log(recipe);
    res.render('recipe-details', {
      recipe,
      recipeId: req.session.recipeId,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
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

module.exports = router;
