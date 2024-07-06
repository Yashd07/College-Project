import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    image: null,
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('eventName', eventData.eventName);
      formData.append('image', eventData.image);
      formData.append('startDate', eventData.startDate);
      formData.append('endDate', eventData.endDate);
      formData.append('description', eventData.description);
      formData.append('location', eventData.location);

      

      const accesToken = localStorage.getItem("accesToken");
      const config = {
        method: 'POST',
        body: formData,
        headers: { 
          Authorization: `Bearer ${accesToken}`
        },
      };

      const response = await fetch('http://localhost:3001/api/events', config);

      


      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      // Reset the form after successful submission
      setEventData({
        eventName: '',
        image: null,
        startDate: '',
        endDate: '',
        description: '',
        location: ''
      });

      // Show success toast message
      toast.success('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      // Show error toast message
      toast.error('Failed to create event. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Event Name"
              name="eventName"
              value={eventData.eventName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              fullWidth
              label="Image URL"
              name="image"
              value={eventData.image}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="date"
              label="End Date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Location"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default EventForm;
