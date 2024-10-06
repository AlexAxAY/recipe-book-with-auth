import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
    category: "",
  });

  const [error, setError] = useState([]);
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setNewRecipe((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const closingTag = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    const trimmedData = {
      title: newRecipe.title.trim(),
      category: newRecipe.category.trim(),
      ingredients: newRecipe.ingredients.trim(),
      instructions: newRecipe.instructions.trim(),
      image: newRecipe.image.trim(),
    };
    e.preventDefault();
    const token = localStorage.getItem("Token");
    try {
      await axios.post("http://localhost:5000/recipes/add", trimmedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        image: "",
        category: "",
      });

      setError([]);

      navigate("/recipes");
    } catch (err) {
      const validationError = err.response;
      if (validationError && validationError.data) {
        setError(validationError.data);
        console.log(validationError.data);
        setOpen(true);
      } else {
        console.log("Error in posting data!", err);
      }
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        {error.length > 0 && open && (
          <div>
            {error.map((msg, index) => (
              <Stack sx={{ width: "100%" }} spacing={2} key={index}>
                <Alert severity="warning" onClose={closingTag}>
                  {msg}
                </Alert>
              </Stack>
            ))}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={newRecipe.title}
            className="form-control"
            id="title"
            placeholder="Title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            value={newRecipe.category}
            onChange={handleChange}
            className="form-select"
            id="category"
            aria-label="category"
          >
            <option value="">Select a category</option>
            <option value="Veg">Veg</option>
            <option value="Non-veg">Non-veg</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleChange}
            className="form-control"
            id="ingredients"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleChange}
            className="form-control"
            id="instructions"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={newRecipe.image}
            className="form-control"
            id="image"
            placeholder="Image URL"
          />
        </div>

        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "center", marginBottom: 3 }}
        >
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Form;
