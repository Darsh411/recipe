const express = require('express');
const { createRecipe, deleteRecipe, updateRecipe, getAllRecipes, getRecipe } = require('../controllers/recipeController');

const router = express.Router();


// Authentication
router.post('/create',createRecipe);
router.delete('/delete/:id', deleteRecipe);

// Protect later routes
router.put("/update/:id",updateRecipe);

// Logout user
router.get('/', getAllRecipes);
router.get('/:id', getRecipe);

