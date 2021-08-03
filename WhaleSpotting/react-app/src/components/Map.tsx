import "../styles/Map.scss";
import "../styles/Home.scss";
import React, { useEffect, useState } from "react";
import { Button, Style } from "./Button";
import SightingApiModel from "../apiModels/SightingApiModel";
import MapChart from "./MapChart";
import Weather from "./SightingMapInfo";
import WeatherCard from "./SightingMapInfo";
import SightingMapInfo from "./SightingMapInfo";

export interface Chosen {
    id: number,
    lat: number,
    lon: number
}

export default function Map(): JSX.Element {

    const [chosen, setChosen] = useState<Chosen>();

    return (
        <div className="map-component">
            {/* <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" /> */}
            <h2 className="map-header">MAP OF SIGHTINGS</h2>
            <div className="map-container">
                <MapChart chosen={chosen} setChosen={setChosen} />
            </div>
            <div className="map-info">
                <SightingMapInfo chosen={chosen} />
            </div>
        </div>
    );
}