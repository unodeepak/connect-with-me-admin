import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';

function JWTLogin() {
  // Local state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation before submission
    let formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';
    setErrors(formErrors);

    // If no errors, proceed with the login (dummy action here)
    if (!formErrors.email && !formErrors.password) {
      console.log('Form submitted', { email, password });
      // Add your login logic here
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

      <Grid container justifyContent="center">
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
