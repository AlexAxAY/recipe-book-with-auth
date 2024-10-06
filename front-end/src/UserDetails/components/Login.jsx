import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [valError, setValError] = useState([]);
  const [tag, setTag] = useState();

  const handleChange = (e) => {
    setData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const closingTag = () => {
    setTag(false);
  };

  const handleSubmit = async (e) => {
    const trimmedData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        trimmedData
      );

      const token = response.data.token;
      localStorage.setItem("Token", token);

      alert("login successfull!");

      setTimeout(() => {
        navigate("/recipes");
      }, 2000);
    } catch (error) {
      const validationError = error.response;

      if (validationError && validationError.data) {
        setValError(validationError.data);
        console.log("validation error:", validationError.data);
        setTag(true);
      } else {
        console.log("Error in Login!", error);
      }
    }
  };
  return (
    <div className="main-div">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <br />
        {valError.length > 0 && tag && (
          <div>
            {valError.map((msg, index) => (
              <Stack sx={{ width: "100%" }} spacing={2} key={index}>
                <Alert
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  severity="warning"
                  onClose={closingTag}
                >
                  {msg}
                </Alert>
              </Stack>
            ))}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={data.name}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <Stack
          sx={{ display: "flex", justifyContent: "center" }}
          spacing={2}
          direction="row"
        >
          <Button type="submit" variant="contained">
            LOG IN
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
