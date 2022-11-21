import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';

const CreateUser = () => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const onChange = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  };

  const create = async (ev) => {
    ev.preventDefault();
    const credentials = { username: user.username, password: user.password };
    try {
      await axios.post('/api/users', user);
      setUser({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
      });
      dispatch(attemptLogin(credentials));
    } catch (error) {
      setError(ex.response.data);
    }
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" noValidate onSubmit={create} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="user-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={user.username}
                  onChange={onChange}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={onChange}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={user.firstName}
                  onChange={onChange}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={user.lastName}
                  onChange={onChange}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={onChange}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <br />
                <br />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <br />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <br />
                <Typography>
                  <Link
                    href="/"
                    variant="subtitle1"
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    SIGN IN
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  return (
    <div>
      {['CREATE ACCOUNT'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={'left'}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CreateUser;
