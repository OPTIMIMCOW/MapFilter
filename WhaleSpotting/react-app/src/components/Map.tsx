import "../styles/Map.scss";
import "../styles/Home.scss";
import React, { useEffect } from "react";
import { Button, Style } from "./Button";
import SightingApiModel from "../apiModels/SightingApiModel";
import MapChart from "./MapChart";

export default function Map(): JSX.Element {

    return (
        <div className="map-component">

            {/* <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" />
            <h2>MAP OF SIGHTINGS</h2> */}
            <div className="map-container">
                <div className="map">
                    <MapChart />
                </div>

            </div>
            {/* <div className="map-info">
                Weather
                Picture of whale
            </div> */}
        </div>
    );
}