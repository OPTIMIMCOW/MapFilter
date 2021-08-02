
import React, { useState, useEffect } from "react";

export default function FetchData(): JSX.Element {
    //TODO Fetch api
    async function populateSightingData() {
        const response = await fetch("sightings");
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