import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = (props) => {
    const [map, setMap] = useState(null)

    const containerStyle = {
        width: '370px',
        height: '250px'
      };
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const center = {
        lat: props.addressLat,
        lng: props.addressLng
      };
      // const center = useMemo(() => ({ let: props.addressLat, lng: props.addressLng}),[props.addressLat, props.addressLng])
      // const center = useMemo(() => ({
      //   lat: props.addressLat,
      //   lng: props.addressLng

      // }))
      // };

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCWuIzNz5FgDHTZR1C79IWc8qr-t6fHm8U"
        // googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY
      })

      const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
      
        setMap(map)
      }, [center])
      
      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, [])
      
  return  isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <>
      </>
    </GoogleMap>
) : <></>
}

export default Map
