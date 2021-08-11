import React, { useState } from "react";
import "../styles/Home.scss";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import Card from "./Card";
import { SightingApiModel } from "../api/models/SightingApiModel";
import { BannerImage } from "./BannerImage";
import { getConfirmedSightings } from "../api/apiClient";

export default function Home(): JSX.Element {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    function orderFeedBy(): void {
        
        //TODO "this needs to be implemented";
    }
    async function getSightings(pageNumber: number, pageSize: number) {
        const sightings = await getConfirmedSightings({ "confirmed": true }, pageNumber, pageSize)
            .then(response => response.json())
            .then(data => setData(data));
    }

    function ReturnSightings(props: any): JSX.Element {
        const info = props.data.map(s => {
        const sighting: SightingApiModel =
        {
            id: s.Id,
            sightedAt: s.SightedAt,
            species: s.Species,
            quantity: s.Quantity,
            location: s.Location,
            longitude: s.Longitude,
            latitude: s.Latitude,
            description: s.Description,
            orcaType: s.OrcaType,
            orcaPod: s.OrcaPod,
            confirmed: s.Confirmed,
            userId: s.UserId,
            username: s.Username
        };
        return sighting;
        });
        return info.map(s => {
            <Card sighting={s} />
        })
    }

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        setPage(page - 1);
    }

    return (
        <div className="home" data-testid="home">
            <BannerImage />
            <div className="home-contents">
                <div className="report-button-container">
                    <Button 
                        style={Style.primary}
                        text="REPORT SIGHTING"
                        dataTestId="sighting-button"
                        link="/Reportsighting"
                    />
                </div>
                <div className="sightings-header">
                    <h2>Recent Sightings</h2>
                    <Button
                        style={Style.secondary}
                        text="Order By Location"
                        dataTestId="filter-button"
                        onClick={orderFeedBy}
                        minWidth25={true}
                    />
                </div>
                <div className="card-holder">
                    {data ? <ReturnSightings props={data} /> :"Loading" }
                </div>
                <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />
            </div>
        </div>
    );
}
