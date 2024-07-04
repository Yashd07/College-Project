import React from 'react';
import { Avatar, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
const UserDash= () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150"
  };

 // const user = useSelector(state => state.user.user);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Card elevation={3}>
          <CardContent>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Avatar alt="User Image" src={user.image} sx={{ width: 100, height: 100 }} />
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
                      Update Profile
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
  );
};

export default UserDash;
