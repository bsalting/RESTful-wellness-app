import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';

const Give = () => {
  useEffect(() => {
    const searchKey = 'mental-health';
    const myPublicApiKey = '	c1376197b59677facd5b240f0428da0a';
    const options = {
      method: 'GET',
      url: `https://partners.every.org/v0.2/search/${searchKey}?apiKey=${myPublicApiKey}`,
    };

    (async (options) => {
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.nonprofits);
          setCauses(response.data.nonprofits);
        })
        .catch(function (error) {
          console.error(error);
        });
    })(options);
  }, []);

  const [causes, setCauses] = useState([]);
  return (
    <div>
      <Container>
        <h2>Support a cause</h2>

        <Grid container spacing={6} align="center">
          {causes.map((cause) => {
            return (
              <Grid item xs={12} sm={6} key={cause.ein}>
                <Card sx={{ maxWidth: 550 }}>
                  <CardMedia
                    component="img"
                    alt="RESTful Cause"
                    height="150"
                    image={cause.coverImageUrl}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {cause.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cause.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Give;
