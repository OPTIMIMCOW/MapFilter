import "../styles/Home.scss";
import React from "react";


export default function Home() {
    return (
        <div className="home" data-testid="home">
            <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt=""></img>

            <div className="home-contents">
                <div className="report-button-container">
                    <button className="report-button">REPORT SIGHTING</button>
                </div>
                <div className="sightings-header">
                    <h2>Recent Sightings</h2>
                    <button className="filter-button" data-testid="filter-button">Order By Location</button>
                </div>

                <div className="card-holder">
                    <div className="card">
                        Replace these divs for your card
                    </div>
                    <div className="card">
                        text text text
                    </div>
                    <div className="card">
                        text text text
                    </div>
                    <div className="card">
                        text text text
                    </div>
                </div>

                <div className="page-nav" data-testid="page-nav">
                    <button className="page-button"> Previous Page</button>
                    <button className="page-button" >Next Page</button>
                </div>
            </div>
        </div>
    );
}
