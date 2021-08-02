import React, { useState } from "react";
import { isPropertySignature } from "typescript";
import SightingApiModel from "../apiModels/SightingApiModel";

interface infoProps {
    place: {lon: number, lat: number};
}

// export default function SightingMapInfo({place}: infoProps): JSX.Element {
export default function SightingMapInfo(): JSX.Element {
    const [page, setPage] = useState(1);

    //TODO - fetch weather api with the sighting model
    const place = {
        lon: -122.08, 
        lat: 37.39}; 

    const weatherApiData = [
        {
            "coord": {
                "lon": -122.08,
                "lat": 37.39
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 282.55,
                "feels_like": 281.86,
                "temp_min": 280.37,
                "temp_max": 284.26,
                "pressure": 1023,
                "humidity": 100
            },
            "visibility": 16093,
            "wind": {
                "speed": 1.5,
                "deg": 350
            },
            "clouds": {
                "all": 1
            },
            "dt": 1560350645,
            "sys": {
                "type": 1,
                "id": 5122,
                "message": 0.0139,
                "country": "US",
                "sunrise": 1560343627,
                "sunset": 1560396563
            },
            "timezone": -25200,
            "id": 420006353,
            "name": "Mountain View",
            "cod": 200
        }
    ];

    return (
        <div className="weather-component" data-testid="weather">
            <h4>Current weather at this sighting</h4>
            <div>lon {weatherApiData[0].coord.lon} lat {weatherApiData[0].coord.lat}</div>
            <div>weather {weatherApiData[0].weather[0].main} temp {weatherApiData[0].main.temp} wind {weatherApiData[0].wind.deg} {weatherApiData[0].wind.speed} </div>

        </div>
    );
}
