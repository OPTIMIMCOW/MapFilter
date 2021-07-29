import "../styles/Card.scss";
import React, { useState } from "react";

export default function Card() : JSX.Element {

    const [closeCard, setCardState] = useState(true);

    // Admin and approved will be received from backend.
    const admin = true;
    const approved = false;
    
    return (
        <div className="card-component">
            <div className={admin && !approved ? "admin pending" : "non-admin pending"}> pending </div>
            <div className="card-info"
                onClick={() => setCardState(!closeCard)} data-testid="card">
                <div className={closeCard ? "first-column" : "first-column open"}>
                    <div className="always">Sighted At: 21 Aug 2020</div>
                    <div className="always">Species: Orca</div>
                    <div className="always">Location: </div>
                    <div className="always">Quantity: 3</div>
                    <div className="always">Reported By: Whale Watcher </div>
                </div>
                <div className={closeCard ? "second-column" : "second-column open"}>
                    <div className="desktop">Orca type: Orca</div>
                    <div className="desktop">Longitude: </div>
                    <div className="desktop">Latitude </div>
                    <div className="admin">User Id: 1</div>
                    <div className="desktop">Description: Whales are fully aquatic, open-ocean creatures </div>
                </div>
            </div>
        </div>
    );
}