import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "../redux/features/auth/authSlice";
import { useEffect } from "react";

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [userToken, dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hello world!
        </Typography>
        {userInfo ? (
          <Button
            color="inherit"
            component={NavLink}
            to="/dashboard"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={NavLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
