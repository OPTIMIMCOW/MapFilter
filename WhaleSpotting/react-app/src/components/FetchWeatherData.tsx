/*eslint-disable*/
import React, { useState, useEffect } from "react";
import WeatherForecastApiModel from "../apiModels/WeatherForecastApiModel";
import authService from "./api-authorization/AuthorizeService";

// example of auth being used for a fetch to an endpoint (line 10-12)- look at weatherforecastcontroller for backend
export default function FetchWeatherData(): JSX.Element {
    const [forecastData, setData] = useState<Array<WeatherForecastApiModel>>();

    async function populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch("weatherforecast", {
            headers: !token ? {} : { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setData(data);
    }

    async function makeAdmin() {
        const token = await authService.getAccessToken();
        const response = await fetch("User/MakeAdmin", {
            headers: !token ? {} : { "Authorization": `Bearer ${token}` }
        });
        console.log(response);
    }
    async function checkAdmin() {
        const token = await authService.getAccessToken();
        const response = await fetch("User/CheckAdmin", {
            headers: !token ? {} : { "Authorization": `Bearer ${token}` }
        });
        console.log(response);
    }
    async function removeAdmin() {
        const token = await authService.getAccessToken();
        const response = await fetch("User/RemoveAdmin", {
            headers: !token ? {} : { "Authorization": `Bearer ${token}` }
        });
        console.log(response);
    }

    useEffect(() => {
        populateWeatherData();
    }, []);

    let contents = <p><em>Loading...</em></p>;

    if (forecastData) {
        contents =
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecastData.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>;
    }

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <button onClick={makeAdmin}>Make admin</button>
            <button onClick={checkAdmin}>Check admin</button>
            <button onClick={removeAdmin}>Remove admin</button>
        </div>
    );
}
