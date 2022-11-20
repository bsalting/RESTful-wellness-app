import React, { useState, useEffect } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import ParkMarker from './ParkMarker';

function Park() {
  const [userCoords, setUserCoords] = useState();
  const [libraries] = useState(['places']);
  const [parkMarkers, setParkMarkers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(latLng);
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

  return (
    <div>
      <div className="centered">
        <h1>Some Fresh Air</h1>
        <p>Nearest green spaces near you:</p>
      </div>

      <div className="map-box">
        <GoogleMap
          center={userCoords}
          zoom={1}
          mapContainerStyle={{ width: '75%', height: '75%' }}
          onLoad={(map) => loadPlaces(map)}
        >
          <Marker position={userCoords} />

          {parkMarkers}
        </GoogleMap>
      </div>
    </div>
  );
}

function ErrorDisplay(props) {
  return (
    <div className="centered">
      <h1>Some Fresh Air</h1>
      <p className="strong">You're one walk away from a good mood...</p>
      <img
        src="https://i.pinimg.com/originals/c4/f0/38/c4f038c63e6a9bbcde0d5fc574487358.jpg"
        width="1100px"
        height="600px"
      />
    </div>
  );
}

export default Park;
