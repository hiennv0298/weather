import React, { Component, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';
import _ from 'lodash';
import API_KEY from './../../../apimap.json';
import { Bound, MapProps } from "../constants/typeDefinition";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 10.75,
  lng: 106.666672
};


const Map = (props: MapProps) => {

  const googleMapRef: any = useRef();
  const [bound, setBound] = useState<Bound>();


  const onOverlayCompelete = (e: any) => {
    if (e.type === google.maps.drawing.OverlayType.RECTANGLE) {
      const bounds = e.overlay.getBounds();
      console.log(bounds);

    }

  }

  useEffect(() => {
    if (googleMapRef.current) {
      console.log(googleMapRef.current);
    }
  }, []);

  const onZoomChanged = () => {
    if (googleMapRef.current) {
      console.log(googleMapRef.current.props.zoom);
      console.log(googleMapRef.current.state.map.zoom);
    }
  }

  return (
    <GoogleMap
      ref={googleMapRef}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onZoomChanged={onZoomChanged}
      options={{
        minZoom: 3
      }}
    >
      <DrawingManager
        options={
          {
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
              drawingModes:
                [
                  google.maps.drawing.OverlayType.MARKER,
                  google.maps.drawing.OverlayType.RECTANGLE,
                ]
            },
            rectangleOptions: {
              fillColor: "#BDFFFC",
              strokeColor: "#FDFC00",
            }
          }
        }
        onOverlayComplete={onOverlayCompelete}
      />
    </GoogleMap>
  )

}


export default Map;

