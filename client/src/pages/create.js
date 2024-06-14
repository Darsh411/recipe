import React, { useState } from 'react';
import axios from 'axios';

const CreateRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    servings: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/recipeRouter', formData);
      console.log('Recipe created:', response.data.data.recipe);
      // Reset form data after successful submission
      setFormData({
        title: '',
        ingredients: '',
        instructions: '',
        cookingTime: '',
        servings: '',
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Cooking Time (minutes):</label>
          <input
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Servings:</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
