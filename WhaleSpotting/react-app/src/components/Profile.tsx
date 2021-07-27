import "../styles/Profile.scss";
import React from "react";

export function Profile(): JSX.Element {

    const isVisibleBronze = true;
    const isVisibleSilver = true;
    const isVisibleGold = true;
    return (
        <div>
            {/* <div className="user-details-container">
                <div className="text-badge-container">
                    <div className="text-container">
                        <h1 className="heading">UserName</h1>
                        <p className="user-information"> Joined: June 2004</p>
                        <p className="user-information reported-sightings"> 15 Reported Sightings</p>
                        <p className="user-information"> Badges Achieved: </p>
                        <div className="badge-container">
                            <img className={`badges ${isVisibleBronze ? "visible" : ""}`} src="https://picsum.photos/id/237/50" />
                            <img className={`badges ${isVisibleSilver ? "visible" : ""}`} src="https://picsum.photos/id/237/50" />
                            <img className={`badges ${isVisibleGold ? "visible" : ""}`} src="https://picsum.photos/id/237/50" />
                        </div>
                    </div>
                </div>
                <img className="profile-image" src="https://picsum.photos/id/237/200" />
            </div> */}
            {/* <div className="spacer"></div> */}
            <div className="alt-outer-container">
                <div className="alt-badge-text-container">
                    <div className="alt-heading-container">
                        <h1 className="alt-heading">UserName</h1>
                        <p className="alt-joined alt-little-text"> Joined: June 2004</p>
                    </div>
                    <div className="alt-badge-container">
                        <div className="alt-sightings-container">
                            <p className="alt-15 alt-big-text"> 15</p>
                            <p className="alt-reported alt-little-text"> Reported <br></br> Sightings</p>
                        </div>
                        <img className="alt-badge" src="https://picsum.photos/id/215/70" />
                    </div>
                </div>
                <img className="alt-profile-image" src="https://picsum.photos/id/237/200" />
            </div>
        </div>
    );
}