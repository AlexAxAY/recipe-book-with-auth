import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div style={{ position: "fixed" }}>
      <Stack spacing={2} direction="row">
        {!isLoggedIn && (
          <>
            <Button
              href="/user/login"
              style={{
                color: "#F0F0F0",
                fontWeight: "bold",
                boxShadow: "none",
              }}
              variant="text"
            >
              Login
            </Button>
            <Button
              href="/user/register"
              style={{
                color: "#F0F0F0",
                fontWeight: "bold",
                boxShadow: "none",
              }}
              variant="text"
            >
              Register
            </Button>
          </>
        )}

        <Button
          component={Link}
          to="/recipes"
          style={{ color: "#F0F0F0", fontWeight: "bold", boxShadow: "none" }}
          variant="text"
        >
          Recipes
        </Button>
      </Stack>
    </div>
  );
};

export default AuthButtons;
