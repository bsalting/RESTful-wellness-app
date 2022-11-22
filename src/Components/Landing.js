import React from 'react';
import { Container, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Landing = () => {
  return (
    <div>
      <Container>
        <Grid container>
          <br /> <br /> <br /> <br /> <br />
          <Grid item xs={12} sm={12} align="center">
            <div></div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> Life </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> often gives </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> us many things all </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> at once. </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> Maintaining </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> balance is essential for </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> our well-being. </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> Find </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> your center </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <div> today. </div>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <img src="/static/logo.png" width="400"></img>
          </Grid>
        </Grid>
      </Container>
      <div id="horizon">
        <Container>
          <Grid container>
            <Grid item xs={12} sm={10} align="left">
              <br />
              <EmailIcon /> <FacebookIcon /> <InstagramIcon /> <TwitterIcon />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Landing;
