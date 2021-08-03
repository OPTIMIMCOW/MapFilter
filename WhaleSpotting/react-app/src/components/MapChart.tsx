import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Chosen } from "./Map";
import WeatherCard from "./SightingMapInfo";

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

interface MapChartProps {
    chosen: Chosen | undefined;
    setChosen: Dispatch<SetStateAction<Chosen | undefined>>;
}

export function MapChart({ chosen, setChosen }: MapChartProps): JSX.Element {
    const [data, setData] = useState<SightingApiModel[]>([]);

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

        <ComposableMap className = "simple-map"
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
                        onClick={() => setChosen({ id: id, lat: latitude, lon: longitude })} >
                        <circle r={2} fill={chosen !== undefined && id === chosen.id ? "#FFA500" : "#0000FF"} stroke="#fff" strokeWidth={0.2} />
                    </Marker>
                ))}
            </ZoomableGroup>
        </ComposableMap>
    );
}

export default MapChart;