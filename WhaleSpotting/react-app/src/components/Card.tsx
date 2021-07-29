import "../styles/Card.scss";
import React from "react";
// import PageNav from "./PageNav";

export default function Card(): JSX.Element {

    return (
        <div className="card-component" data-testid="card">
            <div className="first-column columns">
                <div className="always">Sighted At: 21 Aug 2020</div>
                <div className="always">Species: Orca</div>
                <div className="always">Location: </div>
                <div className="always">Quantity: 3</div>
                <div className="always">Reported By: Whale Watcher </div>
            </div>
            <div className="second-column columns">
                <div className="desktop">Orca type: Orca</div>
                <div className="desktop">Longitude: </div>
                <div className="desktop">Latitude </div>
                <div className="admin">User Id: 1</div>
                <div className="desktop">Description: Wdfjslfj sdfkjaslfdjka lsadfjkdsf Wdfjsl fjWdfjslfj Wdfjslf jWdfj slfjWdf jslfj sldfjasf lasdfkjsdaf asdlfsadal </div>
            </div>
            <div className="admin pending"> pending </div>
        </div>
    );
}