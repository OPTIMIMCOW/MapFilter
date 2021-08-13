import "../styles/Card.scss";
import React, { useState } from "react";
import { SightingApiModel } from "../api/models/SightingApiModel";
import { Button, Style } from "./Button";
import { deleteSighting, confirmSighting } from "../api/apiClient";
import { WhaleImageDictionary } from "../api/ApiLookups";
import { OrcaType, Species } from "../api/ApiEnums";
import { WhaleVisualTextDictionary, OrcaTypeTextDictionary } from "../api/ApiLookups";

interface CardProps {
    sighting: SightingApiModel;
    admin?: boolean;
    reject?: (id: number) => void;
    approve?: (id: number) => void;
}

/*eslint-disable-next-line*/
export default function Card({ sighting, admin = false, reject = (id: number) => {}, approve = (id: number) => {} }: CardProps): JSX.Element {
    const [closeCard, setCardState] = useState(true);

    return (
        <div data-testid="sighting-card">
            <div className="card-component" data-testid="card-component">
                {!sighting.confirmed && <div className="pending" data-testid="pending"> PENDING </div>}
                <div className="card-info"
                    onClick={() => setCardState(!closeCard)} data-testid="card">
                    <img className={closeCard ? "species-image closed" : "species-image open"}
                        data-testid="speciesImage" src={WhaleImageDictionary[sighting.species]}
                        alt="species image" />
                    <div className="first-column">
                        <div>Sighted At: {sighting.sightedAt.split("T")[0].split("-").join("/")}</div>
                        <div>Species: {WhaleVisualTextDictionary[sighting.species]}</div>
                        <div>Location: {sighting.location}</div>
                        <div>Quantity: {sighting.quantity}</div>
                        <div>Reported By: {sighting.username} </div>
                    </div>
                    <div data-testid="second-column" className={closeCard ? "second-column closed" : "second-column open"}>
                        <div data-testid="orca-type" hidden={sighting.species !== Species.Orca || !sighting.orcaType}>Orca type: {sighting.orcaType === null ? "" : OrcaTypeTextDictionary[sighting.orcaType]}</div>
                        <div data-testid="orca-pod" hidden={sighting.orcaType !== OrcaType.SouthernResident}>Orca pod: {sighting.orcaPod}</div>
                        <div>Longitude: {sighting.longitude} </div>
                        <div>Latitude: {sighting.latitude} </div>
                        <div>Description: {sighting.description} </div>
                    </div>
                </div>
            </div>
            {!sighting.confirmed && admin && <div className="buttons-container" >
                <Button
                    style={Style.reject}
                    text="Reject"
                    onClick={() => {
                        reject(sighting.id);
                    }}
                    minWidth25={true}
                />
                <Button
                    dataTestId="approve-button"
                    style={Style.primary}
                    text="Approve"
                    onClick={() => {
                        approve(sighting.id);
                    }}
                    minWidth25={true}
                />
            </div>}
        </div>
    );
}
