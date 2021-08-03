import React, { useEffect, useState } from "react";
import { isPropertySignature } from "typescript";
import WeatherApiModel from "../apiModels/WeatherApiModel";

interface infoProps {
    place: { lon: number, lat: number };
}

export default function WeatherCard({place}: infoProps): JSX.Element {
//export default function SightingMapInfo(props: any): JSX.Element {

    //TODO - fetch weather api with the sighting model
    //props.lon, props.lat

    const [weatherData, setWeatherData] = useState<WeatherApiModel>();

    async function fetchWeather(): Promise<WeatherApiModel | void> {
        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&Appid=35d29d97cfc38cae6b23aa34bc4af423`)
            .then(response => response.json())
            .then(response => setWeatherData(response))
            .catch(() => console.log("no data"));
    }

    useEffect(() => {
        fetchWeather();
    }, []);

    console.log(weatherData == undefined);
    if (weatherData === undefined) {
        return <div> Loading... </div>;
    } else {
        return (
            <div className="weather-component" data-testid="weather">
                <h4>Current weather at this sighting</h4>
                <div>lon {weatherData.lon} lat {weatherData.lat}</div>
                <div>weather {weatherData.current.weather[0].main} temp {weatherData.current.temp} wind {weatherData.current.wind_speed} visibility {weatherData.current.visibility}</div>
            </div>
        );
    }

}
