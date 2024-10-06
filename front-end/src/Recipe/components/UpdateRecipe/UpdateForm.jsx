import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import "./UpdateForm.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdatedForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateRecipe, setUpdateRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
    category: "",
  });

  const [error, setError] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setUpdateRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe data!", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setUpdateRecipe((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  };

  const closingTag = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    const trimmedData = {
      title: updateRecipe.title.trim(),
      category: updateRecipe.category.trim(),
      ingredients: updateRecipe.ingredients.trim(),
      instructions: updateRecipe.instructions.trim(),
      image: updateRecipe.image.trim(),
    };

    e.preventDefault();
    try {
      const token = localStorage.getItem("Token");
      await axios.put(
        `http://localhost:5000/recipes/${id}/update`,
        trimmedData, {headers: {Authorization: `Bearer ${token}`}}
      );
      setError([]);
      navigate(`/recipes/${id}`);
    } catch (err) {
      const validationError = err.response;
      if (validationError && validationError.data) {
        setError(validationError.data);
        setOpen(true);
      }
      console.error("Error updating recipe!", err);
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        {error.length > 0 && open && (
          <div>
            {error.map((msg) => (
              <Stack sx={{ width: "100%" }} spacing={2}>
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
            value={updateRecipe.title}
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
            value={updateRecipe.category}
            onChange={handleChange}
            className="form-select"
            id="category"
            aria-label="category"
          >
            <option value="">Select a category</option>
            <option value="Veg">Veg</option>
            <option value="Non-veg">Non-veg</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={updateRecipe.ingredients}
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
            value={updateRecipe.instructions || ""}
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
            value={updateRecipe.image}
            onChange={handleChange}
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
            Update
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UpdatedForm;
