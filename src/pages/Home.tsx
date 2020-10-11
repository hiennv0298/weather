import React, { Component } from 'react'
import MapComponent from '../components/map/map'


interface FormProps {
    fetchWeather: Function;
    weather: Record<string, any>;
}

interface FormState {
    random: number;
    imageSource: string;
}

const Home = () => {
    return (
        <MapComponent></MapComponent>
    )
}

export default Home;