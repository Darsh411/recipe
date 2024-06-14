const Recipe = require('../models/recipeModel');
const catchAsync = require('../utilities/catchAsync');

exports.getAllRecipes = catchAsync(async (req, res) => {
  const recipes = await Recipe.find();

  res.status(200).json({
    status: 'success',
    results: recipes.length,
    data: {
      recipes,
    },
  });
});

exports.getRecipe = catchAsync(async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.findById(id);

  if (!recipe) {
    return res.status(404).json({
      status: 'fail',
      message: 'No recipe found with that id!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.createRecipe = catchAsync(async (req, res) => {
  const newRecipe = await Recipe.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      recipe: newRecipe,
    },
  });
});

exports.updateRecipe = catchAsync(async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!recipe) {
    return res.status(404).json({
      status: 'fail',
      message: 'No recipe found with that id!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.deleteRecipe = catchAsync(async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.findByIdAndDelete(id);

  if (!recipe) {
    return res.status(404).json({
      status: 'fail',
      message: 'No recipe found with that id!',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
