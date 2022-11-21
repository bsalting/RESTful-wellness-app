import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreateUser from './CreateUser';

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const theme = createTheme();

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={4} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <br />
            <img
              src="https://media.istockphoto.com/id/1300620744/vector/balancing-zen-stone-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=hnnXJ9Q2EZXf45t1WLKAGHaohGGKkROwLYZZYKDUqnQ="
              width="100"
            ></img>
            <Typography
              variant="h4"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Lucida Grande',
                fontWeight: 700,
                color: 'slate gray',
                textDecoration: 'none',
              }}
            >
              RESTFul
            </Typography>
            <br />
            <br />
            <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={onChange}
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={onChange}
                variant="standard"
              />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <Box>
              <CreateUser />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={8}
          sx={{
            backgroundImage: 'url(/static/login.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'right',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
