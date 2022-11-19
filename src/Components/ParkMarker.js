import React from 'react';
import { MarkerF, InfoWindowF } from '@react-google-maps/api';

function ParkMarker(props) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <MarkerF
      position={props.result.geometry.location}
      icon={'/static/tree.svg'}
      onClick={() => setIsActive(true)}
    >
      {isActive && (
        <InfoWindowF
          position={props.result.geometry.location}
          onCloseClick={() => setIsActive(false)}
        >
          <div>
            <div className="place-title">
              <b>{props.result.name}</b>
            </div>
            <div className="place-address">{props.result.vicinity}</div>
          </div>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}

export default ParkMarker;
