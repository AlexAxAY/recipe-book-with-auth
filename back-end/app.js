const express = require("express");
const app = express();
const recipeRoutes = require("./Routes/recipeRoutes");
const userRoutes = require("./Routes/userRoutes");

const PORT = 5000;

const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/recipe-book")
  .then(() =>
    console.log(`Mongoose connected, successfully running on ${PORT}`)
  )
  .catch((err) => console.log("Error in connecting to DB!", err));

app.use("/recipes", recipeRoutes);
app.use("/user", userRoutes);

app.listen(PORT);
