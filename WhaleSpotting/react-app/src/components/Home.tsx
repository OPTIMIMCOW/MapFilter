import React, { useState, useEffect } from "react";
import "../styles/Home.scss";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import Card from "./Card";
import { SightingApiModel } from "../api/models/SightingApiModel";
import { BannerImage } from "./BannerImage";
import { getConfirmedSightings } from "../api/apiClient";

export default function Home(): JSX.Element {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<SightingApiModel[]>([]);

    function orderFeedBy(): void {
        //TODO "this needs to be implemented";
    }

    useEffect(() => {
        getConfirmedSightings({ "confirmed": true }, page, 10)
            .then(data => setData(data));
    }, [page]);

    const cards = data.map((s, index) => <Card sighting={s} key={index} />);

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
                    {cards.length === 0 ? "Loading..." : cards}
                </div>
                <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />
            </div>
        </div>
    );
}
