import AllRecipes from "./Recipe/pages/AllRecipes";
import Home from "./Home/page/Home";
import RecipeShow from "./Recipe/pages/RecipeShow";
import AddRecipe from "./Recipe/pages/AddRecipe";
import RegisterForm from "./UserDetails/pages/RegisterForm";
import LoginForm from "./UserDetails/pages/LoginForm";
import UpdateRecipe from "./Recipe/pages/UpdateRecipe";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Recipe Paths */}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeShow />} />
          <Route path="/recipes/add" element={<AddRecipe />} />
          <Route path="/recipes/:id/update" element={<UpdateRecipe />} />

          {/* User Paths */}
          <Route path="/user/register" element={<RegisterForm />} />
          <Route path="/user/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
