const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["Veg", "Non-veg", "Vegan"],
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Register",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
