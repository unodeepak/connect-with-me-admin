import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { NavLink } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JWTLogin() {
  // Local state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Basic validation before submission
      let formErrors = {};
      if (!email) formErrors.email = 'Email is required';
      if (!password) formErrors.password = 'Password is required';
      setErrors(formErrors);

      // If no errors, proceed with the login (dummy action here)
      if (!formErrors.email && !formErrors.password) {
        console.log('Form submitted', { email, password });
        const data = await axios.post('http://localhost:5001/api/user/auth/login', { email, password });
        console.log('Data is : ', data);

        // Save tokens to localStorage or sessionStorage
        localStorage.setItem('userData', JSON.stringify(data?.data?.data?.data));
        localStorage.setItem('accessToken', data?.data?.data?.token?.accessToken);
        localStorage.setItem('refreshToken', data?.data?.data?.token?.refreshToken);
        navigate('/app/dashboard/analytics');
      }
      return false;
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      console.log('Error is: ', err);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Email"
          placeholder="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          required
        />
      </Box>

      <Grid container justifyContent="center" mb={4}>
        <Grid item>
          <Button color="primary" variant="contained" fullWidth size="large" type="submit">
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

// export default LoginForm;

export default JWTLogin;
