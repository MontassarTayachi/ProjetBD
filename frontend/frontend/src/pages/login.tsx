import { Box, Divider, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';


const Login= () => {

  const [showPassword, setShowPassword] = useState(false);

  

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="hello@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Sign in
      </LoadingButton>
    </Box>
  );

    return (
        <>
          <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">Sign in</Typography>
            <Typography variant="body2" color="text.secondary">
              Don’t have an account?
              <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                Get started
              </Link>
            </Typography>
          </Box>
    
          {renderForm}
    
          <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
            >
              OR
            </Typography>
          </Divider>
    
          
        </>
      );
}

export default Login;
