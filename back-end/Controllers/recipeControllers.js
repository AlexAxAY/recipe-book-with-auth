const Recipe = require("../models/Recipe/RecipeSchema");
const Register = require("../models/User/Register/RegisterSchema");
const recipeSchema = require("../models/Recipe/RecipeSchema");

const getAllRecipes = async (req, res) => {
  try {
    const AllRecipes = await Recipe.find().populate("createdBy", "name");
    res.json(AllRecipes);
  } catch (error) {
    console.log("Error in fetching all data!", error);
  }
};

const addRecipe = async (req, res) => {
  const userId = req.user.id;

  const userName = await Register.findById(userId);
  if (!userName) {
    return res.status(404).json(["User not found"]);
  }

  const recipeData = { ...req.body, createdBy: userId };

  const { error } = recipeSchema.validate(recipeData);
  if (error) {
    const errorMsg = error.details.map((m) => m.message);
    console.log("adding error:", errorMsg);
    return res.status(400).json(errorMsg);
  }

  try {
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    res.json(newRecipe);
  } catch (err) {
    console.log("Error in adding item!", err);
    res.status(500).json(["Internal server error"]);
  }
};

const getSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.json(recipe);
  } catch (err) {
    console.log("Error in fetching the particular item!", err);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    userId = req.user.id;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json(["Recipe not found!"]);
    }

    if (recipe.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this recipe." });
    }

    await Recipe.findByIdAndDelete(id);
    res.json(["Recipe deleted successfully!"]);
  } catch (err) {
    console.log("Error in deleting item!", err);
    return res.status(500).json({ message: "Error in deleting item!" });
  }
};

const updateRecipe = async (req, res) => {
  const userId = req.user.id;

  req.body.createdBy = userId;

  const { error } = recipeSchema.validate(req.body);
  if (error) {
    const errorMsg = error.details.map((m) => m.message);
    return res.status(400).json(errorMsg);
  }

  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(403).json(["recipe not found!"]);
    }

    if (recipe.createdBy.toString() !== userId) {
      return res
        .status(404)
        .json(["Access denied. Not authorized to update this recipe"]);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedRecipe);
  } catch (err) {
    console.log("Error in updating the item!", err);
  }
};

module.exports = {
  getAllRecipes,
  addRecipe,
  getSingleRecipe,
  deleteRecipe,
  updateRecipe,
};
