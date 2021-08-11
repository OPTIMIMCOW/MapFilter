import "../styles/Profile.scss";
import "../styles/Home.scss";
import "../styles/Buttons.scss";
import React, { useState, useEffect } from "react";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import { SightingApiModel } from "../api/models/SightingApiModel";
import Card from "./Card";
import { fetchCurrentUser, fetchPendingSightings, makeAdmin, checkAdmin, removeAdmin, fetchCurrentUserSightings } from "../api/apiClient";
import { UserApiModel } from "../api/models/UserApiModel";
import { Link } from "react-router-dom";

export function Profile(): JSX.Element {
    const [feedToggle, setFeedToggle] = useState("Sightings");
    const [page, setPage] = useState(1);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [data, setData] = useState<SightingApiModel[]>([]);
    const [currentUser, setCurrentUser] = useState<UserApiModel>();

    useEffect(() => {
        checkifAdmin();
        getUser();
    }, []);

    async function getUser() {
        setCurrentUser(await fetchCurrentUser());
    }

    async function checkifAdmin() {
        setIsUserAdmin(await checkAdmin());
    }

    async function makeAdminHandler() {
        await makeAdmin()
            .then(() => setIsUserAdmin(true));
    }

    async function removeAdminHandler() {
        await removeAdmin()
            .then(() => setIsUserAdmin(false))
            .then(() => setFeedToggle("Sightings"));
    }

    const orca: SightingApiModel = {
        id: 1,
        sightedAt: new Date().toDateString(),
        species: "whale",
        quantity: 1,
        location: "Deep Ocean",
        longitude: 1.232,
        latitude: 2.312,
        description: "Whales at sea",
        orcaType: "Whale",
        orcaPod: "k",
        confirmed: false,
        username: "FakeUser1"
    };

    const orcaConfirmed: SightingApiModel = {
        id: 2,
        sightedAt: new Date().toDateString(),
        species: "orca",
        quantity: 3,
        location: "Sea",
        longitude: 1.232,
        latitude: 2.312,
        description: "Whales at sea",
        orcaType: "Orca",
        orcaPod: "",
        confirmed: true,
        username: "FakeUserConfirmed"
    };

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        setPage(page - 1);
    }

    useEffect(() => {
        if (feedToggle == "Approvals") {
            fetchPendingSightings(page)
                .then(data => setData(data));
        } else if (feedToggle == "Sightings") {
            fetchCurrentUserSightings(page)
                .then(data => setData(data));
        }
    }, [feedToggle, page]);

    const cards = data.map((s, index) => <Card sighting={s} admin={isUserAdmin} key={index} />);

    return (
        <div className="body">
            <div className="profile-pane">
                <div className="outer-container">
                    <div className="inner-container">
                        <h1 data-testid="username" className="heading">{currentUser?.username}</h1>
                        <div className="trophy-container">
                            <p className="feature-text"> 15</p>
                            <p className="reported little-text"> Reported <br /> Sightings</p>
                            <img className="trophy-image" alt="Trophy Image" src="https://picsum.photos/id/215/50" />
                        </div>
                        <img className="profile-image" alt="Profile Image" src={`https://robohash.org/${currentUser?.username}?set=any&bgset=any`} />
                    </div>
                    <div className="button-container">
                        <Button
                            style={Style.primary}
                            text="Sightings"
                            onClick={() => setFeedToggle("Sightings")}
                        />
                        <Button
                            style={Style.primary}
                            text="Approvals"
                            onClick={() => setFeedToggle("Approvals")}
                            dataTestId="approval-toggle"
                            hidden={!isUserAdmin}
                        />
                        <Button
                            style={Style.secondary}
                            text="Make Admin"
                            onClick={makeAdminHandler}
                            hidden={isUserAdmin}
                            dataTestId="make-admin" />
                        <Button
                            style={Style.secondary}
                            text="Remove Admin"
                            onClick={removeAdminHandler}
                            hidden={!isUserAdmin}
                            dataTestId="remove-admin" />
                    </div>
                </div>
            </div>
            <div className="feed">
                <h2 className="heading">Your {feedToggle}</h2>
                <div className="card-holder">
                    {(cards.length === 0 && page === 1) ? <div className="card-component">Nothing here, <Link to="reportsighting"> report a sighting </ Link> </div> : cards}
                </div>

                {(cards.length === 0 && page === 1 && feedToggle === "Sightings") ?
                    <div></div>
                    :
                    <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />}
            </div>
        </div>
    );
}