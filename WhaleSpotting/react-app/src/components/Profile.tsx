import "../styles/Profile.scss";
import "../styles/Home.scss";
import "../styles/Buttons.scss";
import React from "react";
import { useState } from "react";
import PageNav from "./PageNav";

export function Profile(): JSX.Element {
    const [feedToggle, setFeedToggle] = useState("Sightings");

    return (
        <div className="body">
            <div className="profile-pane">
                <div className="outer-container">
                    <div>
                        <h1 className="heading">UserName</h1>
                        <p className="joined little-text"> Joined: June 2004</p>
                        <div className="trophy-container">
                            <p className="feature-text"> 15</p>
                            <p className="reported little-text"> Reported <br/> Sightings</p>
                            <img className="trophy-image" alt="Trophy Image" src="https://picsum.photos/id/215/50" />
                        </div>
                        <img className="profile-image" alt="Profile Image" src="https://picsum.photos/id/237/200" />
                    </div>
                    <div className="button-container">
                        <button className="primary-button" onClick={() => setFeedToggle("Sightings")}>Sightings</button>
                        <button className="primary-button" data-testid="approval-toggle" onClick={() => setFeedToggle("Approvals")}>Approvals</button>
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