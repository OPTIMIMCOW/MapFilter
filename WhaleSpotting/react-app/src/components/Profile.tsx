import "../styles/Profile.scss";
import "../styles/Home.scss";
import React from "react";
import { useState } from "react";
import PageNav from "./PageNav";

export function Profile(): JSX.Element {

    const [feedToggle, setFeedToggle] = useState("Sightings");

    return (
        <div className="body">
            <div className="banner">
                <div className="outer-container">
                    <div className="trophy-text-container">
                        <h1 className="heading">UserName</h1>
                        <p className="joined little-text"> Joined: June 2004</p>
                        <div className="trophy-container">
                            <p className="feature-text"> 15</p>
                            <p className="reported little-text"> Reported <br></br> Sightings</p>
                            <img className="trophy-image" src="https://picsum.photos/id/215/70" />
                        </div>
                        <img className="profile-image" src="https://picsum.photos/id/237/200" />
                    </div>
                    <div className="button-container">
                        <a className="toggle" onClick={() => setFeedToggle("Sightings")}>Sightings</a>
                        <a className="toggle" data-testid="approval-toggle" onClick={() => setFeedToggle("Approvals")}>Approvals</a>
                    </div>
                </div>
            </div>
            <div className="feed">
                <h1 className="heading">Your {feedToggle}</h1>
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