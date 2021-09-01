/*eslint-disable*/
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/Map.scss";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";
import { Chosen } from "./Map";
import { fetchBatchGeography } from "../api/apiClient";
import { BatchGeographyRequestModel } from "../api/models/BatchGeographyRequestModel";
import { BatchGeographyApiModel } from "../api/models/BatchGeographyApiModel";
import { markerColour, xCoordBatch, yCoordBatch } from "../api/ApiLookups"

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface MapChartProps {
    chosen: Chosen | undefined;
    setChosen: Dispatch<SetStateAction<Chosen | undefined>>;
    clicked: number;
}

export function MapChart({ chosen, setChosen, clicked }: MapChartProps): JSX.Element {
    const [data, setData] = useState<BatchGeographyApiModel>({ batch: 0, geography: [] });
    const [redraw, setRedraw] = useState<number>(0);

    const width = 800;
    const height = 600;
    const zoom = 1;
    let boundingBox = [90, -180, -90, 180];
    const totalBatch = 9;

    if (redraw != clicked) {
        setData({ batch: 0, geography: [] });
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
        boundingBox = [upperLatitude, lowerLongitude, lowerLatitude, upperLongitude];
        console.log(boundingBox);
    }

    useEffect(() => {
        if (data.batch < totalBatch) {
            console.log(`ran batch: ${data.batch}`);
            const upperLatitude = boundingBox[0];
            const lowerLatitude = boundingBox[2];
            const stepLatitude = (upperLatitude - lowerLatitude) / 3;
            const upperLongitude = boundingBox[3];
            const lowerLongitude = boundingBox[1];
            const stepLongitude = (upperLongitude - lowerLongitude) / 3

            const request: BatchGeographyRequestModel = {
                maxLatitude: upperLatitude - (stepLatitude * yCoordBatch[data.batch]),
                minLatitude: upperLatitude - (stepLatitude * (yCoordBatch[data.batch] + 1)),
                minLongitude: lowerLongitude + (stepLongitude * xCoordBatch[data.batch]),
                maxLongitude: lowerLongitude + (stepLongitude * (xCoordBatch[data.batch] + 1)),
                batchNumber: data.batch + 1,
            };

            debugger;

            fetchBatchGeography(request)
                .then(newData => {
                    const newBatchGeographyApiModel: BatchGeographyApiModel =
                    {
                        batch: newData.batch,
                        geography: data.geography.concat(newData.geography),
                    }
                    setData(newBatchGeographyApiModel);
                });
        }
    }, [data]);


    return (
        <div>
            <div> {`Loaded Results: ${data.batch} of ${totalBatch}`} </div>
            <div data-testid="loading"> {`Total Results: ${data.geography.length}`} </div>
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
                    {data.geography.map(({ id, longitude, latitude, attractionType }, index) => {
                        //console.log(type);
                        const isChosen = chosen !== undefined && id === chosen.id;
                        return <Marker
                            data-testid={isChosen ? "chosen" : "not-chosen"}
                            key={index} coordinates={[longitude, latitude]} name=""
                            onClick={() => setChosen({ id: id, lat: latitude, lon: longitude })} >
                            <circle r={2} fill={isChosen ? "#FFA500" : markerColour[attractionType as keyof typeof markerColour]} stroke="#fff" strokeWidth={0.2} />
                        </Marker>;
                    }
                    )}
                </ZoomableGroup>
            </ComposableMap>
        </div >
    );

}