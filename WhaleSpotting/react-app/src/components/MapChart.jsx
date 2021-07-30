/* eslint-disable */
import React from "react";
import {Link} from "react-router-dom";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
const markers = [
    {
        markerOffset: -15,
        name: "Buenos Aires",
        coordinates: [-58.3816, -34.6037]
    }
];

const MapChart = () => {
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

            {markers.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <circle r={10} fill="#89CFF0" stroke="#fff" strokeWidth={2} />
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