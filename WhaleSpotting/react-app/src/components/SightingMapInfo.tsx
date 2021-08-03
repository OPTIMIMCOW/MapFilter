import React, { useEffect, useState } from "react";
import { isPropertySignature } from "typescript";
import WeatherApiModel from "../apiModels/WeatherApiModel";
import { Chosen } from "./Map";
import "../styles/SightingMapInfo.scss";

interface infoProps {
    chosen: Chosen | undefined;
}

// export default function SightingMapInfo({place}: infoProps): JSX.Element {
export default function SightingMapInfo({ chosen }: infoProps): JSX.Element {

    const response = {
        lon: chosen?.lon,
        lat: chosen?.lat,
        species: ["Whale", "Orca", "Dolphin"]
    };
    //TODO - fetch weather api with the sighting model
    //props.lon, props.lat

    const [weatherData, setWeatherData] = useState<WeatherApiModel>();
    async function fetchWeather(): Promise<WeatherApiModel | void> {
        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${chosen!.lat}&lon=${chosen!.lon}&units=metric&Appid=35d29d97cfc38cae6b23aa34bc4af423`)
            .then(response => response.json())
            .then(response => setWeatherData(response))
            .catch(() => console.log("no data"));
    }

    useEffect(() => {
        if (chosen) {
            fetchWeather();
        }
        console.log(chosen);
    }, [chosen]);

    if (!chosen || !chosen.lat || !chosen.lon) {
        return <div className="weather-component-empty" data-testid="weather"></div>;
    }

    if (!weatherData) {
        return <div> Loading.. </div>;
    }
    console.log(weatherData);

    return (
        <div className="weather-component" data-testid="weather">
            <h4>Information about this sighting</h4>
            <div className="location">Longitude: {weatherData.lon}° Latitude: {weatherData.lat}°</div>
            <div className="sighting-info">
                <div className="weather-info">Current Weather: {weatherData.current.weather[0].main} <br />Temperature: {weatherData.current.temp}°C <br />Wind Speed: {weatherData.current.wind_speed} m/s <br />Visibility: {weatherData.current.visibility} m</div>
                <div className="species">Species spotted here: <ul>{response.species.map((s, index) => <li key={index}>{s}</li>)}</ul></div>
            </div>
        </div>
    );

}
