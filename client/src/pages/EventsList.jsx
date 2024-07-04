// EventsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, Typography } from '@mui/material';
import EventCard from '../components/EventCard';
import Api from '../api/Api'

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Api.get('/events') // Use the configured Axios instance
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Upcoming Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventsList;
