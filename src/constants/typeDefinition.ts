export type Bound = {
    east: number,
    west: number,
    north: number,
    south: number,
    zoom?: number
}

export type City = {
    id: number,
    name: string,
    state?: string,
    country: string,
    coord: {
        lat: number,
        lng: number
    }
}

export type Coordinate = {
    lat: number,
    lng: number,
    zoom?: number,
}

export type Weather = {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main?: string,
            description?: string,
            icon?: string
        }
    ],
    base?: string,
    main: {
        temp?: number, // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        feels_like?: number, //  Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        pressure?: number, // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
        humidity?: number, //  Humidity, %
        temp_min?: number, //  Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        temp_max?: number, //  Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        sea_level?: number, // Atmospheric pressure on the sea level, hPa
        grnd_level?: number, // Atmospheric pressure on the ground level, hPa
    },
    wind: {
        speed?: number,
        deg?: number, // Wind direction, degrees (meteorological)
        gust?: number //  Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
    },
    clouds: {
        all?: number // Cloudiness, %
    },
    rain?: {
        "1h"?: number,// Rain volume for the last 1 hour, mm
        "3h"?: number // Rain volume for the last 3 hours, mm
    },
    snow?: {
        "1h"?: number,// snow volume for the last 1 hour, mm
        "3h"?: number // snow volume for the last 3 hours, mm
    },
    dt: number, //  Time of data calculation, unix, UTC,
    sys: {
        type?: number,
        id?: number,
        message?: string,
        country?: string, // country code
        sunrise: number,
        sunset: number
    },
    timezone?: number,
    id: number,
    name?: string,
    cod?: string
}