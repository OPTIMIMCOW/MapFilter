import React, { useEffect, useState } from "react";
import WeatherApiModel from "../api/models/WeatherApiModel";
import { Chosen } from "./Map";
import "../styles/SightingMapInfo.scss";
import { Species } from "../apiModels/ApiEnums";
import { WhaleImageDictionary, WhaleVisualTextDictionary } from "../apiModels/ApiLookups";

interface SightingMapInfoProps {
    chosen: Chosen | undefined;
}

interface IResponse {
    lon: number | void,
    lat: number | void,
    species: Species[]
}

export default function SightingMapInfo({ chosen }: SightingMapInfoProps): JSX.Element {

    const key = process.env.REACT_APP_WEATHER_API_KEY;

    const [weatherData, setWeatherData] = useState<WeatherApiModel>();
    const [speciesData, setSpeciesData] = useState<Species[]>([]);

    useEffect(() => {
        if (chosen) {
            fetchWeather();
            fetchSpecies();
        }
    }, [chosen]);

    const response : IResponse = {
        lon: chosen?.lon,
        lat: chosen?.lat,
        species: speciesData,
    };

    if (!chosen || !weatherData) {
        return <div className="weather-component-empty" data-testid="loading"></div>;
    }

    return (
        <div className="weather-component" data-testid="weather">
            <div>Information about this sighting</div>
            <div className="location">Latitude: {weatherData.lat}°  Longitude: {weatherData.lon}°</div>
            <div className="sighting-info">
                <div className="weather-info">Current Weather: {weatherData.current.weather[0].main}
                    <ul className="list">
                        <li>Temperature: {weatherData.current.temp}°C</li>
                        <li>Wind Speed: {weatherData.current.wind_speed} m/s</li>
                        <li>Visibility: {weatherData.current.visibility} m</li>
                    </ul>
                </div>
                <div className="species">Species spotted here:
                    <ul className="list">{getHumanReadableWhaleNames(response).map(s =>
                        <li key={s}>{s}</li>)}</ul>
                </div>
                <div className="whale-image-container">
                    <img className="whale-image" src={getSingleWhaleImage(response)} alt="local species" />
                </div>
            </div>
        </div>
    );

    async function fetchWeather(): Promise<WeatherApiModel | void> {
        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${chosen!.lat}&lon=${chosen!.lon}&units=metric&Appid=${key}`)
            .then(response => response.json())
            .then(response => setWeatherData(response));
    }

    async function fetchSpecies(): Promise<Array<string> | void> {
        await fetch(`https://localhost:5001/sightings/LocalSpecies?longitude=${chosen!.lon}&latitude=${chosen!.lat}`)
            .then(response => response.json())
            .then(response => setSpeciesData(response));
    }
}

function getSingleWhaleImage(response: IResponse): string {
    return response.species.length != 0
        ? WhaleImageDictionary[response.species[0]]
        : "whaleicon512.png";
}

function getHumanReadableWhaleNames(response: IResponse): Array<string> {
    const humanNames = [];
    for (let i = 0; i < response.species.length; i++) {
        const speciesEnum = response.species[i];
        humanNames.push(WhaleVisualTextDictionary[speciesEnum]);
    }
    return humanNames;
}