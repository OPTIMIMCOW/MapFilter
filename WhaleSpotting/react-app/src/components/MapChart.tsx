/* eslint-disable */
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
    // const response3 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=3");
    // const response4 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=4");
    // const response5 = await fetch("http://hotline.whalemuseum.org/api.json?limit=1000&page=5");
    const json = await response.json();
    const json2 = await response2.json();
    // const json3 = await response3.json();
    // const json4 = await response4.json();
    // const json5 = await response5.json();

    return json.concat(json2);//.concat(json3).concat(json4).concat(json5);
}

const fillColour = "#DDD";

interface PassToMapChart {
    chose:  { id: number, lat: number, lon: number };
    setChoose: React.Dispatch<React.SetStateAction<{
        id: number;
        lat: number;
        lon: number;
    }>>;
}

interface MapChartProps {
    props: PassToMapChart;
}

export function MapChart({props}: MapChartProps): JSX.Element {
    const [data, setData] = useState<SightingApiModel[]>([]);
    //const [chosen, setChosen] = useState<{id:number, lat: number, lon:number} >({id:0, lat:0, lon:0});

    useEffect(() => {
        populateSightingData()
            .then(data => setData(data))
            .catch(() => console.log("no data"));
    }, []);

    console.log(data.length);
    console.log(data);

    if (data.length === 0) {
        return <div> Loading... </div>;
    } 

    const chosenSelected = false;
    console.log(props);

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
                            onClick={() => props.setChoose({id: id, lat: latitude, lon: longitude} )} >
                            <circle r={2} fill={id === props.chose.id ? "#FFA500" : "#0000FF"} stroke="#fff" strokeWidth={0.2} />
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
        </div>
    );
}

export default MapChart;