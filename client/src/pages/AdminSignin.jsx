import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




const AdminSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/admin/signin', formData);
      toast.success('Login successful!');
      localStorage.setItem('token', res.data.token);
      navigate('/admindashboard'); // Redirect to the admin dashboard
    } catch (err) {
      console.error(err.response.data);
      toast.error(err.response.data.msg || 'Login failed!');
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", color: colors.grey[800] }}>
      <Stack spacing={5} sx={{ width: "100%", maxWidth: "500px" }}>
        <Stack>
          <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
            Admin Sign In
          </Typography>
        </Stack>

        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Email</Typography>
                <TextField name="email" value={email} onChange={onChange} required />
              </Stack>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Password</Typography>
                <TextField type='password' name="password" value={password} onChange={onChange} required />
              </Stack>
            </Stack>
            <Button
              type="submit"
              variant='contained'
              size='large'
              sx={{ bgcolor: colors.grey[800], "&:hover": { bgcolor: colors.grey[600] } }}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default AdminSignin;
