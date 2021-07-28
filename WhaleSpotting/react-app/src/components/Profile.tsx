import "../styles/Profile.scss";
import React from "react";

export function Profile(): JSX.Element {

    return (
        <div className="body">
            <div className="banner">
                <div className="outer-container">
                    <div className="badge-text-container">
                        <div className="heading-container">
                            <h1 className="heading">UserName</h1>
                            <p className="joined little-text"> Joined: June 2004</p>
                        </div>
                        <div className="badge-container">
                            <div className="sightings-container">
                                <p className="feature-text"> 15</p>
                                <p className="reported little-text"> Reported <br></br> Sightings</p>
                            </div>
                            <img className="trophy" src="https://picsum.photos/id/215/70" />
                        </div>
                        <img className="profile-image" src="https://picsum.photos/id/237/200" />
                    </div>
                    <div className="button-container">
                        <a className="toggle">Sightings</a>
                        <a className="toggle">Approvals</a>
                    </div>
                </div>

            </div>
        </div>
    );
}