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
import { BatchSightingApiModel } from "../api/models/BatchSightingApiModel";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface MapChartProps {
    chosen: Chosen | undefined;
    setChosen: Dispatch<SetStateAction<Chosen | undefined>>;
    clicked: number;
}

export function MapChart({ chosen, setChosen, clicked }: MapChartProps): JSX.Element {
    const [data, setData] = useState<BatchSightingApiModel>({ batch: 0, sightings: [] });
    const [redraw, setRedraw] = useState<number>(0);

    const width = 800;
    const height = 600;
    const zoom = 1;
    let boundingBox;
    const totalBatch = 10;

    if (redraw != clicked) {
        setData({ batch: 0, sightings: [] });
        setRedraw(clicked);
    }

    function getBoundingBox(centre: [number, number], zoom: number) {
        console.log(centre);
        const halfWidth = (width * 0.5) / zoom;
        const halfHeight = (height * 0.5) / zoom;
        const upperLongitude = (centre[0] + halfWidth) * (360 / 800);
        const lowerLongitude = (centre[0] - halfWidth) * (360 / 800);
        const upperLatitude = (centre[1] + halfHeight) * (180 / 600);
        const lowerLatitude = (centre[1] - halfHeight) * (180 / 600);
        boundingBox = [upperLatitude, lowerLongitude, lowerLatitude, upperLongitude,];
        console.log(boundingBox);
    }

    useEffect(() => {
        if (data.batch < totalBatch) {
            console.log(`ran batch: ${data.batch}`);
            const request: BatchSightingRequestModel = {
                maxLatitude: -72 + (18 * data.batch),
                minLatitude: -90 + (18 * data.batch),
                batchNumber: data.batch + 1,
            };

            fetchBatchSightings(request)
                .then(newData => {
                    const newBatchSightingApiModel: BatchSightingApiModel =
                    {
                        batch: newData.batch,
                        sightings: data.sightings.concat(newData.sightings),
                    }
                    setData(newBatchSightingApiModel);
                });
        }
    }, [data]);


    return (
        <div>
            <div data-testid="loading"> {`Loaded Results: ${data.batch} of ${totalBatch}`} </div>
            <div data-testid="loading"> {`Total Results: ${data.sightings.length}`} </div>
            <ComposableMap
                projection="geoEqualEarth"
                data-testid="simple-map"
                width={width}
                height={height}
            >
                <ZoomableGroup zoom={zoom} center={[16, 0]} onMoveEnd={position => { getBoundingBox(position.coordinates, position.zoom) }}>
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
                    {data.sightings.map(({ id, longitude, latitude }, index) => {
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
        </div >
    );

}