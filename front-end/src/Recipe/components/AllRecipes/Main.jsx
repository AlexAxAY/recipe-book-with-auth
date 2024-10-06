import axios from "axios";
import { useState, useEffect } from "react";
import SingleRecipe from "./SingleRecipe";
import "./Main.css";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const Main = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log("Error in receiving data from API!", err);
      }
    };

    fetchData();
  }, []);

  const checkRecipes = () => {
    return (
      recipes.length === 0 && (
        <p>
          <LocalDiningIcon />
          Oops! It looks like there are no recipes yet. Why not add your
          favorite cuisine and get cooking?
          <LocalDiningIcon />
        </p>
      )
    );
  };

  return (
    <div className="mainDiv">
      {checkRecipes()}
      {recipes.map((m) => {
        return <SingleRecipe recipe={m} key={m._id} />;
      })}
    </div>
  );
};

export default Main;
