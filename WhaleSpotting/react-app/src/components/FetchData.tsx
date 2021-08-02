import React, { useState, useEffect } from "react";
import WeatherForecastApiModel from "../apiModels/WeatherForecastApiModel";
import authService from "./api-authorization/AuthorizeService";

// example of auth being used for a fetch to an endpoint (line 10-12)- look at weatherforecastcontroller for backend
export default function FetchData(): JSX.Element {
    const [forecastData, setData] = useState<Array<WeatherForecastApiModel>>();

    async function populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch("weatherforecast", {
            headers: !token ? {} : { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
    }
    
    useEffect(() => {
        populateSightingData();
    }, []);

    const contents = <p><em>Loading...</em></p>;

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
} 