import { toNumber } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Weather } from '../../constants/typeDefinition'
import { formatTime, getIcon } from '../../constants/Utils'
import { ThunderStorm, Atmosphere, Rain, Clear, Clouds, Snow, Drizzle } from '../../constants/Utils'

import Carousel from './carousel'

const style: any = {
    dislay: 'inline-block'
}



const WeatherDetail: React.FC<{ weather: Weather, click: any }> = ({ weather, click }) => {

    let background = "Clear";

    const main = {
        ThunderStorm: ThunderStorm,
        Drizzle: Drizzle,
        Clouds: Clouds,
        Rain: Rain,
        Snow: Snow,
        Atmosphere: Atmosphere,
        Clear: Clear
    };

    const setImage = () => {
        switch (weather.weather[0].main) {
            case "ThunderStorm":
                background = main.ThunderStorm;
                break;
            case "Drizzle":
                background = main.Drizzle;
                break;
            case "Clouds":
                background = main.Clouds;
                break;
            case "Rain":
                background = main.Rain;
                break;
            case "Snow":
                background = main.Snow;
                break;
            case "Atmosphere":
                background = main.Atmosphere;
                break;
            case "Clear":
                background = main.Clear;
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setImage();
    });

    return (
        <div>
            {weather &&
                <div style={style} onClick={() => click(background)} className="left-weather" >
                    <div className="weather-detail">
                        <div className="weather-header">
                            <Carousel items={weather.weather} />
                            <span className="h2 text-between">{weather.name} - {weather.sys.country}</span>
                        </div>
                        <div className="weather-body">
                            <span className="h3">Current Time: {formatTime(new Date().setUTCDate(toNumber(weather.timezone)))}</span>
                            <span className="h3">Main: {weather.weather && weather.weather.map(w => w.main + ", ").join("").slice(0, -2)}</span>
                            <span className="h3">Description: </span>
                            <div className="weather-description">
                                {weather.weather && weather.weather.map((w, i) =>
                                    <span key={i} className="h4">{w.description}</span>
                                )}
                            </div>
                            <span className="h3">Temperature: {weather.main.temp}&#176;C</span>
                            <div className="temperature">
                                <span className="h4">Human feels like: {weather.main.feels_like}&#176;C</span>
                                <span className="h4">Min: {weather.main.temp_min}&#176;C</span>
                                <span className="h4">Max: {weather.main.temp_max}&#176;C</span>
                            </div>
                            <span className="h3">Pressure: {weather.main.pressure} hPa</span>
                            <div className="atmospheric">
                                <span className="h4">Sea level: {weather.main.sea_level} hPa</span>
                                <span className="h4">Ground level: {weather.main.grnd_level} hPa</span>
                            </div>
                            <span className="h3">Humidity: {weather.main.humidity} %</span>
                            <span className="h3">Wind:</span>
                            <div className="wind">
                                <span className="h4">Speed: {weather.wind.speed}m/s</span>
                                <span className="h4">Direction: {weather.wind.deg}</span>
                                <span className="h4">Gust: {weather.wind.speed}m/s</span>
                            </div>
                            <span className="h4">Has Clouds: {weather.clouds.all}%</span>
                            <span className="h4">Rain:</span>
                            <div className="rain">
                                <span className="h4">Last 1h: {weather.rain?.["1h"]}mm</span>
                                <span className="h4">Last 3h: {weather.rain?.["3h"]}mm</span>
                            </div>
                            <span className="h4">Snow:</span>
                            <div className="snow">
                                <span className="h4">Last 1h: {weather.snow?.["1h"]}mm</span>
                                <span className="h4">Last 3h: {weather.snow?.["3h"]}mm</span>
                            </div>
                        </div>
                    </div>
                </div >}
        </div>
    );
}

export default WeatherDetail;