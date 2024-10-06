import { useState, useEffect } from "react";
import axios from "axios";
import Show from "./Show";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../../shared/components/NavBar";

const Main = () => {
  const [recipe, setRecipe] = useState({});
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
        
      } catch (err) {
        console.log("Error in receiving data from API!", err);
      }
    };

    fetchData();
  }, [id]);

  const deleteItem = async () => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`http://localhost:5000/recipes/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setAlert(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/recipes");
      }, 2000);
    } catch (err) {
      console.log("Error in delete item!", err);
    }
  };

  const deletionAlert = () => {
    setAlert(true);
  };

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <Show
          recipe={recipe}
          deleteItem={deleteItem}
          success={success}
          deletionAlert={deletionAlert}
          alert={alert}
        />
      </div>
    </div>
  );
};

export default Main;
