import "../styles/Profile.scss";
import "../styles/Home.scss";
import "../styles/Buttons.scss";
import React, { useState, useEffect } from "react";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import { SightingApiModel } from "../api/models/SightingApiModel";
import Card from "./Card";
import {
    fetchCurrentUser,
    fetchPendingSightings,
    makeAdmin,
    checkAdmin,
    removeAdmin,
    fetchCurrentUserSightings,
    deleteSighting, confirmSighting
} from "../api/apiClient";
import { UserApiModel } from "../api/models/UserApiModel";
import { Link } from "react-router-dom";

export function Profile(): JSX.Element {
    const [feedToggle, setFeedToggle] = useState("Sightings");
    const [sightingsPage, setSightingsPage] = useState(1);
    const [approvalPage, setApprovalPage] = useState(1);
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

    function nextPage() {
        if (feedToggle == "Sightings") {
            setSightingsPage(sightingsPage + 1);
        }
        else {
            setApprovalPage(approvalPage + 1);
        }
    }

    function previousPage() {
        if (feedToggle == "Sightings") {
            setSightingsPage(sightingsPage - 1);
        }
        else {
            setApprovalPage(approvalPage - 1);
        }
    }

    function getRankSrc(): string {
        if (!currentUser) {
            return "Newbie.jpg";
        } else if (currentUser.sightingsCount === 0) {
            return "Newbie.jpg";
        } else if (currentUser.sightingsCount > 0 && currentUser.sightingsCount <= 3) {
            return "Intermediate.jpg";
        } else if (currentUser.sightingsCount > 3 && currentUser.sightingsCount <= 6) {
            return "Advanced.jpg";
        } else if (currentUser.sightingsCount > 6) {
            return "Master.jpg";
        } else {
            return "Newbie.jpg";
        }
    }

    function fetchData(): void {
        if (feedToggle == "Approvals") {
            fetchPendingSightings(approvalPage)
                .then(data => setData(data));
        } else if (feedToggle == "Sightings") {
            fetchCurrentUserSightings(sightingsPage)
                .then(data => setData(data));
        }
    }

    useEffect(() => {
        fetchData();
    }, [feedToggle, approvalPage, sightingsPage]);

    const cards = data.map((s, index) =>
        <Card sighting={s} admin={isUserAdmin} key={index}
            reject={(id: number) => {
                deleteSighting(id)
                    .then(() => {
                        getUser();
                        fetchData();
                    });
            }}
            approve={(id: number) => {
                confirmSighting(id)
                    .then(() => {
                        getUser();
                        fetchData();
                    });
            }}/>
    );

    return (
        <div className="body">
            <div className="profile-pane">
                <div className="outer-container">
                    <div className="inner-container">
                        <h1 data-testid="username" className="heading">{currentUser?.username ?? "Loading"}</h1>
                        <div className="trophy-container">
                            <p className="feature-text">{currentUser?.sightingsCount ?? 0}</p>
                            <p className="reported little-text"> Reported <br /> Sightings</p>
                            <img className="trophy-image" alt="Trophy Image" src={getRankSrc()} />
                        </div>
                        <img className="profile-image" alt="Profile Image" src={`https://robohash.org/${currentUser?.username}?set=any&bgset=any`} />
                    </div>
                    <div className="button-container">
                        <Button
                            style={Style.secondary}
                            text="Sightings"
                            onClick={() => setFeedToggle("Sightings")}
                        />
                        <Button
                            style={Style.secondary}
                            text="Approvals"
                            onClick={() => setFeedToggle("Approvals")}
                            dataTestId="approval-toggle"
                            hidden={!isUserAdmin}
                        />
                        <Button
                            style={Style.primary}
                            text="Make Admin"
                            onClick={makeAdminHandler}
                            hidden={isUserAdmin}
                            dataTestId="make-admin" />
                        <Button
                            style={Style.primary}
                            text="Remove Admin"
                            onClick={removeAdminHandler}
                            hidden={!isUserAdmin}
                            dataTestId="remove-admin" />
                    </div>
                </div>
            </div>
            <div className="feed">
                <h2 className="heading">Your {feedToggle}</h2>
                <div className="card-holder profile">
                    {cards.length === 0 && sightingsPage === 1 && feedToggle === "Sightings" ? <div className="card-component">Nothing here, <Link to="reportsighting"> report a sighting </ Link> </div> : cards}
                </div>

                {cards.length === 0 && approvalPage === 1 ?
                    <div />
                    :
                    <PageNav page={feedToggle === "Sightings" ? sightingsPage : approvalPage}
                        nextPage={nextPage} previousPage={previousPage} count={cards.length} />}
            </div>
        </div>
    );
}
