import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import { getParsedCommandLineOfConfigFile } from 'typescript';
import Map from './components/map';




function App() {

  const [weather, setWeather] = useState("");

  const drawingRef = useRef(null);

  useEffect(() => {
    
  }, []);

  fetch('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=671129d1fe0e5b8dfac8cf570540017e')
    .then(res => res.json()).then(data => setWeather(JSON.stringify(data)));

  const overlaycompleted = (event: google.maps.drawing.OverlayCompleteEvent) => {
    console.log(event.type);
    if (event.type === 'rectangle') {
      const rectangle = event.overlay as google.maps.Rectangle;
      console.log(rectangle.getBounds());
      // const bounds = {
      //   east: rectangle.getBounds().getNorthEast().
      // }
      fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=105.90577133424291,10.21525517768127,107.54822738893041,11.644497610046974,10&appid=671129d1fe0e5b8dfac8cf570540017e`)
        .then(res => res.json()).then(data => console.log(JSON.stringify(data)));
    }
    if (event.type === 'marker') {
      const marker = event.overlay as google.maps.Marker;

      // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${marker.getPosition()?.lat()}&lon=${marker.getPosition()?.lng()}&appid=671129d1fe0e5b8dfac8cf570540017e`)
      //   .then(res => res.json()).then(data => console.log(JSON.stringify(data)));
    }



  }

  return (
    <div className="App">
      <Map
      ></Map>
    </div>
  );
}

export default App;
