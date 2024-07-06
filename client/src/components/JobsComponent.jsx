import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography, Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddJob from './Addjob';

const JobsComponent = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/jobs/all');
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Container>
      <Box sx={{ marginTop: 2 }}>
        <AddJob />
        <hr/>
        <Typography variant="h4"  align="center" sx={{ marginTop: 3}} gutterBottom>
        All Jobs
      </Typography>
        <Grid container spacing={2}>
      {jobs.map((job) => (
        <Grid item xs={12} md={4} key={job._id}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Title: {job.title}</Typography>
            <Typography><strong>Description:</strong> {job.description}</Typography>
            <Typography><strong>Company:</strong> {job.company}</Typography>
            <Typography><strong>Location:</strong> {job.location}</Typography>
            <Typography><strong>Requirements:</strong> {job.requirements.join(', ')}</Typography>
            <Typography><strong>Salary:</strong> {job.salary}</Typography>
            <Typography><strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</Typography>
          </Paper>
        </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobsComponent;
