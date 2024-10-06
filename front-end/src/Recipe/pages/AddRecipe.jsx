import Form from "../components/AddRecipe/Form";
import NavBar from "../../shared/components/NavBar";

const AddRecipe = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div style={{marginTop:100}}>
        <Form />
      </div>
    </div>
  );
};

export default AddRecipe;
