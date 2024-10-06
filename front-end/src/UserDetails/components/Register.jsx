import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import "./register.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [valError, setValError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    const trimmedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    e.preventDefault();

    setValError({});

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        trimmedData
      );

      const token = response.data.token;
      localStorage.setItem("Token", token);
      alert("Registration Successful!");
      setTimeout(() => navigate("/recipes"), 2000);

      navigate("/recipes");
    } catch (err) {
      const validationError = err.response;
      if (validationError && validationError.data) {
        setValError(validationError.data);
      } else {
        console.log("Error in posting data!", err);
      }
    }
  };

  return (
    <div className="major-div">
      <form onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        <br />
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          {valError.name && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                sx={{ display: "flex", justifyContent: "center" }}
                severity="warning"
              >
                {valError.name}
              </Alert>
            </Stack>
          )}
          <input
            onChange={handleChange}
            name="name"
            value={data.name}
            type="text"
            className="form-control"
            id="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          {valError.email && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                sx={{ display: "flex", justifyContent: "center" }}
                severity="warning"
              >
                {valError.email}
              </Alert>
            </Stack>
          )}
          <input
            type="email"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={data.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          {valError.password && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                sx={{ display: "flex", justifyContent: "center" }}
                severity="warning"
              >
                {valError.password}
              </Alert>
            </Stack>
          )}
          <input
            type="password"
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            value={data.password}
            name="password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          {valError.confirmPassword && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                sx={{ display: "flex", justifyContent: "center" }}
                severity="warning"
              >
                {valError.confirmPassword}
              </Alert>
            </Stack>
          )}
          <input
            onChange={handleChange}
            type="password"
            className="form-control "
            id="confirmPassword"
            value={data.confirmPassword}
            name="confirmPassword"
          />
        </div>

        <Stack
          sx={{ display: "flex", justifyContent: "center" }}
          spacing={2}
          direction="row"
        >
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Register;
