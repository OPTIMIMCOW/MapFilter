import React, { useState, useEffect } from 'react';
import WeatherForecastApiModel from "../apiModels/WeatherForecastApiModel";

export default function FetchData() {
    const [forecastData, setData] = useState<Array<WeatherForecastApiModel>>();

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setData(data);
    }
    
    useEffect(() => {
        populateWeatherData()
    }, []);

    let contents = <p><em>Loading...</em></p>
    
    if (forecastData){
        contents =
            <table className='table table-striped' aria-labelledby="tabelLabel">
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
            </table>
    }

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
} 