import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Mini= ({ lat, lng }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = tt.map({
      key: 'a29neHQuXewt2HvolS5dxJ2Dkhb08dyO',
      container: mapElement.current,
      style: 'tomtom://vector/1/basic-main',
      center: [1, 1],
      zoom: 15
    });
  }, [1, 1]);

  return (
    <div ref={mapElement} style={{ width: '100%', height: '500px' }}></div>
  );
}

export default Mini;