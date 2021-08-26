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
import update from 'immutability-helper';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface MapChartProps {
    chosen: Chosen | undefined;
    setChosen: Dispatch<SetStateAction<Chosen | undefined>>;
}

export function MapChart({ chosen, setChosen }: MapChartProps): JSX.Element {
    const [data, setData] = useState<SightingApiModel[]>([]);
    const [batch, setBatch] = useState<number>(0);

    useEffect(() => {
        if (batch < 10) {
            const request: BatchSightingRequestModel = {
                maxLatitude: -72 + (18 * batch),
                minLatitude: -90 + (18 * batch),
                batchNumber: batch + 1,
            };

            fetchBatchSightings(request)
                .then(newData => {
                    const changeData = data.concat(newData);
                    setBatch(batch + 1);
                    setData(changeData);
                });
        }
    }, [data]);

    if (data.length === 0) {
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