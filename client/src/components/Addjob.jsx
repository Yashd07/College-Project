import { Button, Container, TextField, Typography, Stack } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    company: '',
    applicationDeadline: ''
  });

  const { title, description, requirements, location, salary, company, applicationDeadline } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/jobs/add', formData);
      navigate('/admin/jobs');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Container>
      <Stack spacing={3} sx={{ marginTop: 3 }}>
        <Typography variant="h4">Add Job</Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="Title" name="title" value={title} onChange={onChange} required />
            <TextField label="Description" name="description" value={description} onChange={onChange} required multiline rows={4} />
            <TextField label="Requirements" name="requirements" value={requirements} onChange={onChange} required />
            <TextField label="Location" name="location" value={location} onChange={onChange} required />
            <TextField label="Salary" name="salary" value={salary} onChange={onChange} required />
            <TextField label="Company" name="company" value={company} onChange={onChange} required />
            <TextField label="Application Deadline" name="applicationDeadline" type="date" value={applicationDeadline} onChange={onChange} InputLabelProps={{ shrink: true }} required />
            <Button type="submit" variant="contained">Add Job</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default AddJob;
