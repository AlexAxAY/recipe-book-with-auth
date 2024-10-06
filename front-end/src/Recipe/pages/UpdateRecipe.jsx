import UpdatedForm from "../components/UpdateRecipe/UpdateForm";
import NavBar from "../../shared/components/NavBar";

const UpdateRecipe = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div style={{ marginTop: 100 }}>
        <UpdatedForm />
      </div>
    </div>
  );
};

export default UpdateRecipe;
