/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

async function populateSightingData() {
    const response = await fetch("http://hotline.whalemuseum.org/api.json");
    const response2 = await fetch("http://hotline.whalemuseum.org/api.json?northern%20elephant%20seal");
    const json = await response.json();
    const json2 = await response2.json();

    return await json.concat(json2);
}

const markers = [];

function MapChart() {
    const [data, setData] = useState([]);
    const [chosen, setChosen] = useState({});

    useEffect(() => {
        populateSightingData()
            .then(data => setData(data))
            .catch(console.log("no data"))
    }, []);

    data.forEach(a => {
        markers.push({
            markerOffset: 15,
            name: "",
            coordinates: [a.longitude, a.latitude],
            chosen: false
        })
    })

    return (
        <ComposableMap
            projection="geoEqualEarth"
        >
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#DDD"
                            stroke="#FFF"
                        // fill="#EAEAEC"
                        // stroke="#D6D6DA"
                        />)
                    }
                </Geographies>

                {/* {markers.push(chosen)}; */}
                {markers.map(({ name, coordinates, markerOffset, chosen }, index) => (
                    <Marker key={index} coordinates={coordinates}
                        onClick={a => {
                            console.log("clicked");
                            console.log(coordinates);
                            markers.push({
                                markerOffset: 15,
                                name: "",
                                coordinates: [coordinates.longitude, coordinates.latitude],
                                chosen: false
                            });
                        }}>
                        <circle r={4} fill= {chosen ? "#F24726" : "#FFA500"} stroke="#fff" strokeWidth={0.2} />
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default MapChart;