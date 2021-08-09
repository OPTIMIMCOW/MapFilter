import "../styles/Card.scss";
import React, { useState } from "react";
import SightingApiModel from "../api/models/SightingApiModel";

interface CardProps {
    sighting: SightingApiModel;
}

export default function Card({sighting}: CardProps) : JSX.Element {

    const [closeCard, setCardState] = useState(true);
    
    //TODO - authorise admin to display userIds
    const admin = false;
    
    return (
        <div className="card-component" data-testid="card-component">
            {!sighting.confirmed && <div className="pending" data-testid="pending"> PENDING </div>}
            <div className="card-info"
                onClick={() => setCardState(!closeCard)} data-testid="card">
                <div className="first-column">
                    <div>Sighted At: {sighting.sightedAt.toDateString()}</div>
                    <div>Species: {sighting.species}</div>
                    <div>Location: {sighting.location}</div>
                    <div>Quantity: {sighting.quantity}</div>
                    <div>Reported By: {sighting.username} </div>
                </div>
                <div data-testid="second-column" className={closeCard ? "second-column closed" : "second-column open"}>
                    <div>Orca type: {sighting.orcaType}</div>
                    <div>Orca pod: {sighting.orcaPod}</div>
                    <div>Longitude: {sighting.longitude} </div>
                    <div>Latitude: {sighting.latitude} </div>
                    <div hidden={!admin}>User Id: {sighting.userId}</div>
                    <div>Description: {sighting.description} </div>
                </div>
            </div>
        </div>
    );
}
