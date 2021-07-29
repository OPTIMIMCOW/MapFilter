import "../styles/Home.scss";
import React from "react";
import PageNav from "./PageNav";
import { Button } from "./Button";

export default function Home() : JSX.Element {

    function orderFeedBy():void {
        console.log("this needs to be implemented");
    }

    return (
        <div className="home" data-testid="home">
            <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" />

            <div className="home-contents">
                <div className="report-button-container">
                    <Button 
                        style={0}
                        text="REPORT SIGHTING"
                        dataTestId="sighting-button"
                        minWidth25={false}
                        link="/Reportsighting"/>
                </div>
                <div className="sightings-header">
                    <h2>Recent Sightings</h2>
                    <Button
                        style={1}
                        text="Order By Location"
                        dataTestId="filter-button"
                        onClick={orderFeedBy}
                        minWidth25={true}
                    />
                </div>
                <div className="card-holder">
                    <div className="card-component">
                        Replace these divs for your card
                    </div>
                    <div className="card-component">
                        text text text
                    </div>
                    <div className="card-component">
                        text text text
                    </div>
                    <div className="card-component">
                        text text text
                    </div>
                </div>

                <PageNav />
            </div>
        </div>
    );
}
