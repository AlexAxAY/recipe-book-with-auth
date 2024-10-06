import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const NavBar = () => {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const handleAdd = () => {
    if (isLoggedIn) {
      navigate("/recipes/add");
    } else {
      navigate("/user/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    navigate("/user/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "#031926",
          display: "flex",
          justifyContent: "space-evenly",
        }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            Recipe
          </Typography>
          <Box sx={{ ml: "auto", display: "flex" }}>
            {location.pathname !== "/recipes/add" && (
              <Button onClick={handleAdd} color="inherit">
                Add
              </Button>
            )}
            {!isLoggedIn ? (
              <>
                {location.pathname !== "/user/login" && (
                  <Button href="/user/login" color="inherit">
                    Sign In
                  </Button>
                )}

                {location.pathname !== "/user/register" && (
                  <Button href="/user/register" color="inherit">
                    Sign Up
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button onClick={handleLogout} color="inherit">
                  Log out
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/`}>
                <ListItemIcon sx={{ color: "#031926" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "#031926" }} primary="Home" />
              </ListItemButton>
            </ListItem>
            {location.pathname !== "/recipes" && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to={`/recipes`}>
                  <ListItemIcon sx={{ color: "#031926" }}>
                    <LunchDiningIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#031926" }}
                    primary="Browse Recipes"
                  />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
