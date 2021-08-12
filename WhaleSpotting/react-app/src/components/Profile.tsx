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
import { Rank, reportSightingsRank } from "../Enums/RankLookup";
import ReportSighting from "./ReportSighting";

export function Profile(): JSX.Element {
    const [feedToggle, setFeedToggle] = useState("Sightings");
    const [page, setPage] = useState(1);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [data, setData] = useState<SightingApiModel[]>([]);
    const [currentUser, setCurrentUser] = useState<UserApiModel>();
    const [rank, setRank] = useState<Rank>(0);
    const [rankSrc, setRankSrc] = useState("");

    useEffect(() => {
        checkifAdmin();
        //getUser().then(() => assignRank());
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
        setPage(page + 1);
    }

    function previousPage() {
        setPage(page - 1);
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

    //function assignRank() {
    //    if (!currentUser) {
    //        setRank(Rank.Newbie);
    //    } else if (currentUser.sightingsCount === 0) {
    //        setRank(Rank.Newbie);
    //    } else if (currentUser.sightingsCount > 0 && currentUser.sightingsCount <= 3) {
    //        setRank(Rank.Intermediate);
    //    } else if (currentUser.sightingsCount > 3 && currentUser.sightingsCount <= 6) {
    //        setRank(Rank.Advanced);
    //    } else if (currentUser.sightingsCount > 6) {
    //        setRank(Rank.Master);
    //    } else {
    //        setRank(Rank.Newbie);
    //    }     
    //}

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
                        <h1 data-testid="username" className="heading">{currentUser?.username ?? "Loading"}</h1>
                        <div className="trophy-container">
                            <p className="feature-text">{currentUser?.sightingsCount ?? 0}</p>
                            <p className="reported little-text"> Reported <br /> Sightings</p>
                            <img className="trophy-image" alt="Trophy Image" src={getRankSrc()} />
                            {/*<img className="trophy-image" alt="Trophy Image" src={reportSightingsRank[rank]} />*/}
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
                <div className="card-holder">
                    {cards.length === 0 && page === 1 && feedToggle === "" ? <div className="card-component">Nothing here, <Link to="reportsighting"> report a sighting </ Link> </div> : cards}
                </div>

                {cards.length === 0 && page === 1 ?
                    <div />
                    :
                    <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />}
            </div>
        </div>
    );
}
