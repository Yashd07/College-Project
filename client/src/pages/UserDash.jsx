import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { logout } from "../redux/features/auth/authSlice";

const UserDash = () => {
  const dispath = useDispatch();

  const user = {
    name: "",
    email: "",
    image: "",
  };

  const userFromRedux = useSelector((state) => state.auth.userInfo);

  if (userFromRedux != null) {
    user.name = userFromRedux.name;
    user.email = userFromRedux.email;
    user.image = userFromRedux.image;
  }

  return (
    <>
      <Header />

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardContent>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Avatar
                    alt="User Image"
                    src={user.image}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        view Profile
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="success">
                        Apply Events
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="info">
                        Apply Jobs
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDash;
