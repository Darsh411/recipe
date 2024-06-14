const mongoose =require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    name: String,
    quantity: String
  }],
  instructions: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;