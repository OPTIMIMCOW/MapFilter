import "../styles/Home.scss";
import React from "react";
import PageNav from "./PageNav";
import Card from "./Card";
import SightingApiModel from "../apiModels/SightingApiModel";

export default function Home(): JSX.Element {

    const orca: SightingApiModel = {
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

    return (
        <div className="home" data-testid="home">
            <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" />

            <div className="home-contents">
                <div className="report-button-container">
                    <button className="report-button">REPORT SIGHTING</button>
                </div>
                <div className="sightings-header">
                    <h2>Recent Sightings</h2>
                    <button className="filter-button" data-testid="filter-button">Order By Location</button>
                </div>

                <div className="card-holder">
                    <Card sighting={orca} />
                    <Card sighting={orca}/>
                    <Card sighting={orcaConfirmed}/>
                    <Card sighting={orca}/>
                </div>

                <PageNav />
            </div>
        </div>
    );
}
