import React, { useEffect, useState } from "react";
import WeatherApiModel from "../apiModels/WeatherApiModel";
import { Chosen } from "./Map";
import "../styles/SightingMapInfo.scss";

interface infoProps {
    chosen: Chosen | undefined;
}

export default function SightingMapInfo({ chosen }: infoProps): JSX.Element {

    const response = {
        lon: chosen?.lon,
        lat: chosen?.lat,
        species: ["Whale", "Orca", "Dolphin"]
    };

    const [weatherData, setWeatherData] = useState<WeatherApiModel>();
    async function fetchWeather(): Promise<WeatherApiModel | void> {
        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${chosen!.lat}&lon=${chosen!.lon}&units=metric&Appid=35d29d97cfc38cae6b23aa34bc4af423`)
            .then(response => response.json())
            .then(response => setWeatherData(response));
    }

    useEffect(() => {
        if (chosen) {
            fetchWeather();
        }
    }, [chosen]);

    if (!chosen || !chosen.lat || !chosen.lon || !weatherData) {
        return <div className="weather-component-empty" data-testid="loading"></div>;
    }

    return (
        <div className="weather-component" data-testid="weather">
            <div>Information about this sighting</div>
            <div className="location">Longitude: {weatherData.lon}° Latitude: {weatherData.lat}°</div>
            <div className="sighting-info">
                <div className="weather-info">Current Weather: {weatherData.current.weather[0].main}
                    <ul className="list">
                        <li>Temperature: {weatherData.current.temp}°C</li>
                        <li>Wind Speed: {weatherData.current.wind_speed} m/s</li>
                        <li>Visibility: {weatherData.current.visibility} m</li>
                    </ul>
                </div>
                <div className="species">Species spotted here: <ul className="list">{response.species.map((s, index) => <li key={index}>{s}</li>)}</ul></div>
                <div className="whale-image-container"><img className="whale-image" src="whaleicon512.png" alt="whale"></img></div>
            </div>
        </div>
    );

}
