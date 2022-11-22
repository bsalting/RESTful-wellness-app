import React, { useState, useEffect } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import ParkMarker from './ParkMarker';
import { Container, Grid, Box } from '@mui/material';
import axios from 'axios';

function Park() {
  const [userCoords, setUserCoords] = useState();
  const [libraries] = useState(['places']);
  const [parkMarkers, setParkMarkers] = useState([]);
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(latLng);
        (async () => {
          getWeather(latLng.lat, latLng.lng);
        })();
      },
      () => {
        return <ErrorDisplay />;
      }
    );
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBF5Sacr19aCaMWfifrEvTElGsSGjyaE_I',
    libraries,
  });

  if (!isLoaded || !userCoords) {
    return <ErrorDisplay />;
  }

  function loadPlaces(map) {
    const request = {
      location: userCoords,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: 'park',
    };

    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < results.length && i < 10; i++) {
          let marker = (
            <ParkMarker key={results[i].place_id} result={results[i]} />
          );
          setParkMarkers((prevMarkers) => [...prevMarkers, marker]);
          bounds.extend(results[i].geometry.location);
        }
        map.fitBounds(bounds);
      }
    });
  }

  function getWeather(lat, lng) {
    const options = {
      method: 'GET',
      url: `https://dark-sky.p.rapidapi.com/${lat},${lng}`,
      params: { units: 'auto', lang: 'en' },
      headers: {
        'X-RapidAPI-Key': '4ea22d6f7fmsh7703c9431b9367dp14675cjsnb1f08b5e6743',
        'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWeather(response.data.currently.summary);
        setTemperature(response.data.currently.temperature);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <Container>
      <Box>
        <div>
          <h2>Some Fresh Air</h2>
          <p>
            Take leisure at green spaces near you.
            <span id="weather-tag">
              Today's weather:{' '}
              <b>
                {weather} ({temperature}F)
              </b>
            </span>
          </p>
        </div>
      </Box>
      <Box align="center">
        <div className="map-box">
          <GoogleMap
            center={userCoords}
            zoom={1}
            mapContainerStyle={{ width: '100%', height: '73%' }}
            onLoad={(map) => loadPlaces(map)}
          >
            <Marker position={userCoords} />

            {parkMarkers}
          </GoogleMap>
        </div>
      </Box>
    </Container>
  );
}

function ErrorDisplay(props) {
  return (
    <Container>
      <Box>
        <div>
          <h2>Some Fresh Air</h2>
          <span className="strong">
            You're one walk away from a good mood...
          </span>
        </div>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} align="center">
          <br />
          <div className="centered">
            <img
              src="https://i.pinimg.com/originals/c4/f0/38/c4f038c63e6a9bbcde0d5fc574487358.jpg"
              width="1155px"
              height="600px"
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Park;
