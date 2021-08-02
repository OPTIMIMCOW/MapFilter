import "../styles/Map.scss";
import "../styles/Home.scss";
import React, { useEffect, useState } from "react";
import { Button, Style } from "./Button";
import SightingApiModel from "../apiModels/SightingApiModel";
import MapChart from "./MapChart";
import Weather from "./WeatherCard";

export default function Map(): JSX.Element {

    const [selectedMarker, setSelectedMarker] = useState<SightingApiModel | undefined>(undefined);

    return (
        <div className="map-component">

            {/* <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" /> */}
            <h2>MAP OF SIGHTINGS</h2>
            <div className="map-container">
                <div className="map">
                    <MapChart />
                </div>
            </div>
            <div className="map-info">
                {/* <Weather ()/> */}
                list of spieces
            </div>
        </div>
    );
}