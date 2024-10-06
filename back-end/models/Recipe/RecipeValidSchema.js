const Joi = require("joi");

const recipeSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title should be at least 3 characters long",
  }),

  category: Joi.string().required().messages({
    "any.only": "Category must be either Veg, Non-veg or Vegan",
    "string.empty": "You must select a category",
  }),

  ingredients: Joi.string().required().messages({
    "string.empty":
      "Ingredients are required; please ensure this field is completed",
  }),

  instructions: Joi.string().min(20).required().messages({
    "string.empty":
      "The instructions field is required and cannot be left empty",
    "string.min":
      "Please ensure that the instructions field contains at least 30 words to provide sufficient details for the recipe",
  }),

  image: Joi.string().uri().required().messages({
    "string.empty": "Please provide an image url",
    "string.uri": "Please verify the URL provided, as it appears to be invalid",
  }),
});

module.exports = recipeSchema;
