import React from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import ParkMarker from './ParkMarker';

function Park() {
  const [userCoords, setUserCoords] = React.useState();
  const [libraries] = React.useState(['places']);
  const [parkMarkers, setParkMarkers] = React.useState([]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = {
          lat: +position.coords.latitude,
          lng: +position.coords.longitude,
        };
        setUserCoords(latLng);
      },
      () => {
        return <ErrorDisplay />;
      }
    );
  }, []);

  // this hook loads Maps API from CDN (API key is saved in environment variable)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBF5Sacr19aCaMWfifrEvTElGsSGjyaE_I',
    libraries,
  });

  // only display map when Maps API and user coordinates are loaded
  if (!isLoaded || !userCoords) {
    return <ErrorDisplay />;
  }

  // On map load, search for nearby parks
  function loadPlaces(map) {
    const request = {
      location: userCoords,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: 'park',
    };

    // Google Places "Nearby Search" API
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        // create Bounds for map, which will expand to fit each LatLng
        const bounds = new google.maps.LatLngBounds();

        for (let i = 0; i < results.length && i < 5; i++) {
          // create CustomMarker component for each park and push to state array
          let marker = (
            <ParkMarker key={results[i].place_id} result={results[i]} />
          );

          setParkMarkers((prevMarkers) => [...prevMarkers, marker]);

          // expand bounds to include the marker
          bounds.extend(results[i].geometry.location);
        }

        // after all Markers created, expand map to the bounds
        map.fitBounds(bounds);
      }
    });
  }

  return (
    <div>
      <div className="centered">
        <h1>Get Fresh Air</h1>
        <p>Nearest green spaces near you:</p>
      </div>

      <div className="map-box">
        <GoogleMap
          center={userCoords}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => loadPlaces(map)}
        >
          <MarkerF position={userCoords} />

          {parkMarkers}
        </GoogleMap>
      </div>
    </div>
  );
}

function ErrorDisplay(props) {
  return (
    <div className="centered">
      <h1>Get Fresh Air</h1>
      <p> Note: Enable browser geolocation services for this feature to work</p>
      <p className="strong"> Loading map... Searching for parks...</p>
    </div>
  );
}

export default Park;
