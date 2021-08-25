/*eslint-disable*/
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SightingApiModel } from "../api/models/SightingApiModel";
import "../styles/Map.scss";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";
import { Chosen } from "./Map";
import { fetchBatchSightings } from "../api/apiClient";
import { BatchSightingRequestModel } from "../api/models/BatchSightingRequestModel";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface MapChartProps {
    chosen: Chosen | undefined;
    setChosen: Dispatch<SetStateAction<Chosen | undefined>>;
}

export function MapChart({ chosen, setChosen }: MapChartProps): JSX.Element {
    const [data, setData] = useState<SightingApiModel[]>([]);

    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            batchLoad(i);
        }
    }, []);

    async function batchLoad(i: number): Promise<void> {
        const request: BatchSightingRequestModel = {
            maxLatitude: -45 + (45 * i),
            minLatitude: -90 + (45 * i),
            batchNumber: i + 1,
        };

        await fetchBatchSightings(request)
            .then(newData => setData(data.concat(newData)));

    }

    if (data.length === 0) {
        console.log("the component re ran");
        console.log(data);
        return <div data-testid="loading"> Loading... </div>;
    }

    return (
        <ComposableMap
            projection="geoEqualEarth"
            data-testid="simple-map">
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#DDD"
                            stroke="#FFF"
                        />)
                    }
                </Geographies>
                {data.map(({ id, longitude, latitude }, index) => {
                    const isChosen = chosen !== undefined && id === chosen.id;
                    return <Marker
                        data-testid={isChosen ? "chosen" : "not-chosen"}
                        key={index} coordinates={[longitude, latitude]} name=""
                        onClick={() => setChosen({ id: id, lat: latitude, lon: longitude })} >
                        <circle r={2} fill={isChosen ? "#FFA500" : "#0000FF"} stroke="#fff" strokeWidth={0.2} />
                    </Marker>;
                }
                )}
            </ZoomableGroup>
        </ComposableMap>
    );
}