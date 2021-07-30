import React, { useState, useEffect } from "react";

export default function FetchData(): JSX.Element {
    //TODO Fetch api
    // const [forecastData, setData] = useState<Array<WeatherForecastApiModel>>();

    async function populateSightingData() {
        const response = await fetch("sightings");
        const data = await response.json();
        // setData(data);
    }
    
    useEffect(() => {
        populateSightingData();
    }, []);

    const contents = <p><em>Loading...</em></p>;
    
    // if (forecastData){
    //     contents =
    //         <table className="table table-striped" aria-labelledby="tabelLabel">
    //             <thead>
    //                 <tr>
    //                     <th>Date</th>
    //                     <th>Temp. (C)</th>
    //                     <th>Temp. (F)</th>
    //                     <th>Summary</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {forecastData.map(forecast =>
    //                     // <tr key={forecast.date}>
    //                     //     <td>{forecast.date}</td>
    //                     //     <td>{forecast.temperatureC}</td>
    //                     //     <td>{forecast.temperatureF}</td>
    //                     //     <td>{forecast.summary}</td>
    //                     // </tr>
    //                 )}
    //             </tbody>
    //         </table>;
    // }

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
} 