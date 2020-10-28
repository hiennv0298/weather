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


    const drawn_items = L.featureGroup([]).addTo(map);

    const drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        circle: false,
        polygon: false,
        polyline: false,
        circlemarker: false
      },
      edit: {
        featureGroup: drawn_items
      }
    });

    map.addControl(drawControl);


    map.on(L.Draw.Event.CREATED, async function (event: any) {
      let layer = event.layer;
      drawn_items.addLayer(layer);
      if (event.layerType === "rectangle") {
        const bound = layer.getBounds();
        const weathers = await Promise.all(getWeathers(bound));
        if (weathers instanceof Error) {
          console.log(weathers);
        } else {
          childRef.current.getValue(weathers);
        }
      }
      if (event.layerType === "marker") {
        const coord = layer._latlng;
        const weather = await getWeather(coord);
        if (weather instanceof Error) {
          alert(weather);
        } else {
          childRef.current.getValue([weather]);
        }
      }
    });
  })


  const getWeathers = (bound: any): any => {
    try {
      const rectangleCities = cities.filter(city => bound.contains(city.coord));
      const arrUnsign = unSignedArray(rectangleCities, "name");
      const arrWithoutDup = removeDupWithProp(arrUnsign, "name");
      const apiWeather = arrWithoutDup.map(async (city) => {
        const requestLink = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=671129d1fe0e5b8dfac8cf570540017e`;
        const weather = await fetch(requestLink).then((res: any) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Request quá nhiều");
          }
        }
        ).catch(err => {
          console.log(err)
          return err;
        });
        return weather;
      });
      return apiWeather;
    } catch (err) {
      console.log(err);
      return err;
    }


  }

  const getWeather = (coord: any) => {
    try {
      const requestLink = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lng}&appid=671129d1fe0e5b8dfac8cf570540017e`;
      const weather = fetch(requestLink).then((res: any) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Request quá nhiều")
        }
      }).catch(err => {
        return err;
      });
      return weather;
    } catch (err) {
      return err;
    }
  }


  return (
    <div id="containermap">
      <div id="map" />
      <LeftComponent ref={childRef} />
    </div>
  )
}

export default MapComponent;