import Register from "../components/Register";
import NavBar from "../../shared/components/NavBar";
import "../components/register.css";

const RegisterForm = () => {
  return (
    <div className="register-div">
      <NavBar />
      <Register />
    </div>
  );
};

export default RegisterForm;
