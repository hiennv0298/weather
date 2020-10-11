import React, { Component, useEffect, useRef, useState } from 'react';
import { Bound, Coordinate, City, Weather } from "../../constants/typeDefinition";
import L, { LatLngBounds } from "leaflet"
import "leaflet-draw"
import { removeDupWithProp, unSignedArray } from '../../constants/Utils'

import LeftComponent from '../popup/LeftComponent'

const cities: City[] = require("../../city.list.json");

const MapComponent = () => {

  const childRef: any = useRef();

  useEffect(() => {
    const map = L.map("map").setView([
      10.21525517768127, 105.90577133424291], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        circle: false,
        polygon: false,
        polyline: false,
        circlemarker: false
      }
    });
    const drawn_items = L.featureGroup([]).addTo(map);
    map.addControl(drawControl);


    map.on(L.Draw.Event.CREATED, async function (event: any) {
      let layer = event.layer;
      drawn_items.addLayer(layer);
      if (event.layerType === "rectangle") {
        const bound = layer.getBounds();
        const weathers = await Promise.all(getWeathers(bound));
        childRef.current.getValue(weathers);
      }
      if (event.layerType === "marker") {
        console.log(layer._latlng);
        const coord = layer._latlng;
        const requestLink = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lng}&appid=671129d1fe0e5b8dfac8cf570540017e`;
        fetch(requestLink)
          .then(res => res.json()).then(data => console.log(data));
      }
    });

  })

  const getWeathers = (bound: any) => {
    const rectangleCities = cities.filter(city => bound.contains(city.coord));
    const arrUnsign = unSignedArray(rectangleCities, "name");
    const arrWithoutDup = removeDupWithProp(arrUnsign, "name");
    const apiWeather = arrWithoutDup.map(async (city) => {
      const requestLink = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=671129d1fe0e5b8dfac8cf570540017e`;
      const weather = await fetch(requestLink).then(res => res.json()).then(data => data);
      return weather;
    });
    return apiWeather;
  }



  return (
    <div id="containermap">
      <LeftComponent ref={childRef} />
      <div id="map" />
    </div>
  )
}

export default MapComponent;