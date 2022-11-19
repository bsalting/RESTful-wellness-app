import React from 'react';
import { MarkerF, InfoWindowF } from '@react-google-maps/api';
import treeMarker from '../assets/tree-marker.svg';

/* customizing the MarkerF component allows for each marker to maintain its own active state, 
showing its associated InfoWindowF component when clicked and hiding it on window's closeClick event */
function ParkMarker(props) {
  // true when InfoWindow is visible
  const [isActive, setIsActive] = React.useState(false);

  return (
    <MarkerF
      position={props.result.geometry.location}
      icon={
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Wiki_Loves_Earth_map_marker.svg/600px-Wiki_Loves_Earth_map_marker.svg.png'
      }
      onClick={() => setIsActive(true)}
    >
      {isActive && (
        <InfoWindowF
          position={props.result.geometry.location}
          onCloseClick={() => setIsActive(false)}
        >
          <>
            <div className="place-title">{props.result.name}</div>
            <div className="place-address">{props.result.vicinity}</div>
          </>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}

export default ParkMarker;
