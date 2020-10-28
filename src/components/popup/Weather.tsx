import React, { useEffect, useState } from 'react'
import { Weather } from '../../constants/typeDefinition'
import { getIcon } from '../../constants/Utils'
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
                <div style={style} onClick={() => click(background)} className="left-weather">
                    <div className="weather-detail">
                        <div className="weather-header">
                            <Carousel items={weather.weather} />
                            <span className="h2 text-between">{weather.name}</span>
                        </div>
                        <div className="weather-body">
                            <span className="h3">Timezone: {weather.timezone}</span>
                        </div>
                    </div>
                </div >}
        </div>
    );
}

export default WeatherDetail;