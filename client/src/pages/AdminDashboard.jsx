import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import JobsComponent from '../components/JobsComponent'; // Import your JobsComponent here
import NGOComponent from '../components/NgoComponent'; // Import your NGOsComponent here
import UserComponent from '../components/UserComponent'; // Import your UsersComponent here
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showJobs, setShowJobs] = useState(false);
  const [showNGOs, setShowNGOs] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();

  const handleShowJobs = () => {
    setShowJobs(true);
    setShowNGOs(false);
    setShowUsers(false);
  };

  const handleShowNGOs = () => {
    setShowJobs(false);
    setShowNGOs(true);
    setShowUsers(false);
  };

  const handleShowUsers = () => {
    setShowJobs(false);
    setShowNGOs(false);
    setShowUsers(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/signin');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          {isMobile ? (
            <>
              <Button color="inherit" onClick={handleShowJobs}>
                Jobs
              </Button>
              <Button color="inherit" onClick={handleShowNGOs}>
                NGOs
              </Button>
              <Button color="inherit" onClick={handleShowUsers}>
                Users
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleShowJobs}>
                Jobs
              </Button>
              <Button color="inherit" onClick={handleShowNGOs}>
                NGOs
              </Button>
              <Button color="inherit" onClick={handleShowUsers}>
                Users
              </Button>
              {/* Add other navigation buttons here if needed */}
            </>
          )}
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          {showJobs && (
            <Grid item xs={12}>
              <JobsComponent />
            </Grid>
          )}
          {showNGOs && (
            <Grid item xs={12}>
              <NGOComponent />
            </Grid>
          )}
          {showUsers && (
            <Grid item xs={12}>
              <UserComponent />
            </Grid>
          )}
          {/* Add other content as needed */}
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
