import "../styles/Map.scss";
import "../styles/Home.scss";
import React, { useEffect, useState } from "react";
import { Button, Style } from "./Button";
import SightingApiModel from "../apiModels/SightingApiModel";
import MapChart from "./MapChart";
import Weather from "./WeatherCard";
import WeatherCard from "./WeatherCard";
import SightingMapInfo from "./WeatherCard";

export default function Map(): JSX.Element {

    const [chosen, setChosen] = useState<{ id: number, lat: number, lon: number }>({ id: 0, lat: 0, lon: 0 });
    const mapChartProp = {
        chose: chosen,
        setChoose: setChosen
    };

    return (
        <div className="map-component">

            {/* <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" /> */}
            <h2>MAP OF SIGHTINGS</h2>
            <div className="map-container">
                <div className="map">
                    <MapChart props={mapChartProp} />
                </div>
            </div>
            <div className="map-info">
                
                {chosen.id !== 0 ?
                    <SightingMapInfo chosen={chosen} setChosen={setChosen} />
                    :
                    <div></div>
                }
                list of spieces
            </div>
        </div>
    );
}