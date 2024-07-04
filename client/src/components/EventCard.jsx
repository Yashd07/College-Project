// EventCard.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const EventCard = ({ event }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="140"
        image={event.image}
        alt={event.eventName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          <strong>NGO:</strong> {event.ngoName}<br />
          <strong>Email:</strong> {event.ngoEmail}<br/>
          <strong>Start Date:</strong> {event.startDate}<br />
          <strong>Description:</strong> {event.description}<br />
          <strong>End Date:</strong> {event.endDate}<br />
          <strong>Location:</strong> {event.location}<br />

        </Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
