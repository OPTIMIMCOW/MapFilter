import React, { useState } from "react";
import "../styles/Home.scss";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import Card from "./Card";
import SightingApiModel from "../apiModels/SightingApiModel";
import { BannerImage } from "./BannerImage";

export default function Home(): JSX.Element {
    const [page, setPage] = useState(1);

    function orderFeedBy():void {
        //TODO "this needs to be implemented";
    }

    const orca: SightingApiModel = {
        id: 1,
        sightedAt: new Date(),
        species: "whale",
        quantity: 1,
        location: "Deep Ocean",
        longitude: 1.232,
        latitude: 2.312,
        description: "Whales at sea",
        orcaType: "Whale",
        orcaPod: "k",
        confirmed: true,
        userId: 2,
        username: "FakeUser1"
    };
    
    const orcaConfirmed: SightingApiModel = {
        id: 2,
        sightedAt: new Date(),
        species: "orca",
        quantity: 3,
        location: "Sea",
        longitude: 1.232,
        latitude: 2.312,
        description: "Whales at sea",
        orcaType: "Orca",
        orcaPod: "",
        confirmed: true,
        userId: 2,
        username: "FakeUserConfirmed"
    };

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
                    <Card sighting={orca} />
                    <Card sighting={orca}/>
                    <Card sighting={orcaConfirmed}/>
                    <Card sighting={orca}/>
                </div>
                <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />
            </div>
        </div>
    );
}
