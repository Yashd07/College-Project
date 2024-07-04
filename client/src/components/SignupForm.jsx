import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React,{useState} from 'react';
import axios from 'axios';
import { ScreenMode } from '../pages/SigninPage';
import { toast } from 'react-toastify';






const SignupForm = ({ onSwitchMode }) => {

  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    password: ''
  });

  const { name, mobileNo, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/register', formData);
      toast.success('Registration successful!');
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
      toast.error(err.response.data.msg || 'Registration failed!');
    }

    
  };






  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", color: colors.grey[800]}} >
      <Stack spacing={5} sx={{ width: "100%", maxWidth: "500px"}}>
       
        <Stack>
          <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
            Create an account
          </Typography>
        </Stack>
        <form  onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Name</Typography>
              <TextField name="name" value={name} onChange={onChange} required />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <TextField name="email" value={email} onChange={onChange} required/>
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Phone No.</Typography>
              <TextField name="mobileNo" value={mobileNo} onChange={onChange} required />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <TextField type='password' name="password" value={password} onChange={onChange} required />
            </Stack>
          </Stack>
          <Button type="submit" variant='contained' size='large' sx={{  bgcolor: colors.grey[800], "&:hover": {  bgcolor: colors.grey[600] }  }} >
            Sign in
          </Button>
        </Stack>
        </form>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Sign in
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;