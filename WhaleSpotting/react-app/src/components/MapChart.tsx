import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";
import SightingApiModel from "../apiModels/SightingApiModel";
import WeatherCard from "./WeatherCard";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

async function populateSightingData(): Promise<SightingApiModel[]> {
    const response = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000");
    const response2 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=2");
    const response3 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=3");
    const response4 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=4");
    const response5 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=5");
    const json = await response.json();
    const json2 = await response2.json();
    const json3 = await response3.json();
    const json4 = await response4.json();
    const json5 = await response5.json();

    return json.concat(json2).concat(json3).concat(json4).concat(json5);
}

const fillColour = "#DDD";

export function MapChart(): JSX.Element {
    const [data, setData] = useState<SightingApiModel[]>([]);
    const [chosenId, setChosenId] = useState<number>(0);

    useEffect(() => {
        populateSightingData()
            .then(data => setData(data))
            .catch(() => console.log("no data"));
    }, []);

    if (!data) {
        return <div> Loading </div>;
    }

    return (
        <div>
            <ComposableMap
                projection="geoEqualEarth">
                <ZoomableGroup zoom={1}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={fillColour}
                                stroke="#FFF"
                            // fill="#EAEAEC"
                            // stroke="#D6D6DA"
                            />)
                        }
                    </Geographies>
                    {data.map(({ id, longitude, latitude }, index) => (
                        <Marker key={index} coordinates={[longitude, latitude]} name=""
                            onClick={() => setChosenId(id)} >
                            <circle r={2} fill={id === chosenId ? "#FFA500" : "#0000FF"} stroke="#fff" strokeWidth={0.2} />
                            {/* <text
                            textAnchor="middle"
                            y={15}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
                            {location}
                        </text> */}
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
            <WeatherCard />
        </div>
    );
}

export default MapChart;