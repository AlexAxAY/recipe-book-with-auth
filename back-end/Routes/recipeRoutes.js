const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

const {
  getAllRecipes,
  addRecipe,
  getSingleRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../Controllers/recipeControllers");

router.get("/", getAllRecipes);

router.post("/add",authMiddleware, addRecipe);

router.get("/:id", getSingleRecipe);

router.delete("/:id",authMiddleware, deleteRecipe);

router.put("/:id/update",authMiddleware, updateRecipe);

module.exports = router;
